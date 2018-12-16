<?php

namespace App\Http\Controllers\Frontstage;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Services\OPSkinsTradeAPI\ITrade;
use App\Services\OPSkinsTradeAPI\IUser;
use App\Services\OPSkinsTradeAPI\IItem;

use App\Models\Trade;
use App\Models\User;

class DepositController extends Controller {
  public function index() {
    return view('frontstage.deposit');
  }

  public function handle(Request $request) { // TODO: Add slack logging
    if (Auth::user()['in_trade?']) {
      $request->session()->flash('flash-warning', __('errors.withdraw.in-trade-error'));
      return view('frontstage.deposit');
    }

    if (Auth::user()['locked?']) {
      $request->session()->flash('flash-warning', __('errors.withdraw.user-locked-error'));
      return view('frontstage.deposit');
    }

    $requested_items = $request->input('items.*'); //NOTE: items have to be passed as an array

    // If user selected more that 100 items which is the limit for trade
    if (count($requested_items) > 100) {
      $request->session()->flash('flash-warning', __('errors.withdraw.to_much_selected_items-error'));
      return view('frontstage.deposit');
    }

    // TODO: See if i can replace this with /IItem/GetItemsById/v1/ endpoint
    // TODO: See exactly if tradable in IItem object means if it's currently in trade

    $data = ['steam_id' => Auth::user()['steamid'], 'app_id' => 1]; // data for a request, 1 stands for vgo skins

    $inventory = ITrade::getUserInventoryFromSteamId(env('OPSKINS_API_KEY'), $data);
    $inventory = json_decode($inventory->getBody(), true); // With true parameter so it wil be an assocation table

    array_filter($inventory['response']['items'], function ($item) use ($requested_items) {
      foreach ($requested_items as $requested_item) {
        if ($item['id'] == $requested_item) {
          return true;
        }
      }

      return false;
    });

    if (count($inventory['response']['items']) != count($requested_items)) { // User requested items that are not present in his inventory
      $request->session()->flash('flash-warning', __('errors.withdraw.items-error'));
      return view('frontstage.deposit');
    }

    $value = 0;

    foreach ($inventory['response']['items'] as $item) {
      $value += $item['suggested_price'] * 10; // * 10 because on this site 1$ == 1000 coins
    }

    if (Auth::user()['coins'] < $value) {
      $request->session()->flash('flash-warning', __('errors.withdraw.not-enough-coins'));
      return view('frontstage.withdraw');
    }

    $secret_code = random_bytes(6);

    $data = [
      'twofactor_code' => '', // TODO: Write this
      'steam_id' => Auth::user()['steamid'],
      'items_to_receive' => implode(',', $requested_items),
      // 'expiration_time' => 2 * 60, // 2 minutes // don't need this here
      'message' => 'Deposit to XXX, total value: ' . $value . 'secret: ' . $sercret_code // TODO:
    ];

    $offer = ITrade::sendOfferToSteamId(env('OPSKINS_API_KEY'), $data);
    $offer = json_decode($offer, true); //TODO: Handle error if present

    Trade::create([
      'offer_id' => $offer['result']['offer']['id'],
      'bot_id' => 0, // TODO: Support for multiple bots accounts
      'state' => 2, // STATE_ACTIVE
      'steamid' => $offer['result']['offer']['recipent']['steam_id'],
      'value' => $value,
      'secretcode' => $secret_code,
      'type' => 'deposit',
    ]);

    // Everything went ok, no errors... probably
    $request->session()->flash('flash-success', __('trades.sent-offer'));
    return view('frontstage.deposit');
  }
}
