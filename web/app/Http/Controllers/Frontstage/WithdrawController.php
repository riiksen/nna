<?php

namespace App\Http\Controllers\Frontstage;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Services\OPSkinsTradeAPI\ITrade;
use App\Services\OPSkinsTradeAPI\IUser;
use App\Services\OPSkinsTradeAPI\IItem;

use App\Models\Trade;
use App\Models\User;

use Curl\Curl;

class WithdrawController extends Controller {
  public function index() {
    return view('frontstage.withdraw');
  }


  // TODO: Add slack logging
  // TODO: Add bypass of in_trade? with permission
  // TODO: Testing
  public function handle(Request $request) {
    if (Auth::user()['in_trade?']) {
      $request->session()->flash('flash-warning', __('errors.withdraw.in-trade-error'));
      return view('frontstage.withdraw');
    }

    if (Auth::user()['locked?']) {
      $request->session()->flash('flash-warning', __('errors.withdraw.user-locked-error'));
      return view('frontstage.withdraw');
    }

    $requested_items = $request->input('items.*'); // NOTE: items have to be passed as an array

    // If user selected more that 100 items which is the limit for trade
    if (count($requested_items) > 100) {
      $request->session()->flash('flash-warning', __('errors.withdraw.to_much_selected_items-error'));
      return view('frontstage.withdraw');
    }

    // TODO: See if i can replace this with /IItem/GetItemsById/v1/ endpoint
    // TODO: See exactly if tradable in IItem object means if it's currently in trade

    $data = ['app_id' => 1, 'filter_in_trade' => true]; // data for a request, 1 stands for vgo skins

    $inventory = IUser::getInventory(env('OPSKINS_API_KEY'), $data);
    $inventory = json_decode($inventory->getBody(), true); // With true parameter so it wil be an assocation table

    array_filter($inventory['response']['items'], function ($item) use ($requested_items) {
      foreach ($requested_items as $requested_item) {
        if ($item['id'] == $requested_item) {
          return true;
        }
      }

      return false;
    });

    if (count($inventory['response']['items']) != count($requested_items)) { // User requested items that are not present in our inventory or are in trade
      $request->session()->flash('flash-warning', __('errors.withdraw.items-error'));
      return view('frontstage.withdraw');
    }

    $value = 0;

    foreach ($inventory['response']['items'] as $item) {
      $value += $item['suggested_price'] * 10; // * 10 because on this site 1$ == 1000 coins
    }

    if (Auth::user()['coins'] < $value) {
      $request->session()->flash('flash-warning', __('errors.withdraw.not-enough-coins'));
      return view('frontstage.withdraw');
    }

    $user = Auth::user();

    $user->coins = $user['coins'] - $value;

    $user->save();

    $secret_code = random_bytes(6);

    $data = [
      'twofactor_code' => '', // TODO: Write this
      'steam_id' => Auth::user()['steamid'],
      'items_to_send' => implode(',', $requested_items),
      'expiration_time' => 1 * 60 * 60, // 1 hour
      'message' => 'Withdrawal from XXX, total value: ' . $value . 'secret: ' . $sercret_code // TODO:
    ];

    $offer = ITrade::sendOfferToSteamId(env('OPSKINS_API_KEY'), $data);
    $offer = json_decode($offer, true);

    Trade::create([
      'offer_id' => $offer['result']['offer']['id'],
      'bot_id' => 0, // TODO: Support for multiple bots accounts
      'state' => 2, // STATE_ACTIVE
      'steamid' => $offer['result']['offer']['recipent']['steam_id'],
      'value' => $value,
      'secretcode' => $secret_code,
      'type' => 'withdraw',
    ]);

    // Everything went ok, no errors... probably
    $request->session()->flash('flash-success', __('trades.sent-offer'));
    return view('frontstage.withdraw');
  }
}
