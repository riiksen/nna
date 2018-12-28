<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Modules\OPSkinsTradeAPI\ITrade;
use App\Modules\OPSkinsTradeAPI\IUser;

use App\Models\Trade;
use App\Models\User;

class WithdrawController extends Controller {
  public function index() {
    return view('withdraw');
  }

  // TODO: Add slack logging
  // TODO: Better error api error handling
  // TODO: Add bypass of in_trade? with permission
  // TODO: Testing
  // TODO: Localization
  public function handle(Request $request) {
    $validator = $request->validate([
      'items' => 'required|array|max:100',
      'items.*' => 'unique',
      'items.*.id' => 'distinct|numeric' // TODO: Finish the validation rules for input
    ]);

    if (is_array($request->input('items.*'))) {
      $request->session()->flash('flash-warning', __('errors.withdraw.invalid_input'));
      return view('withdraw');
    }

    if (Auth::user()['in_trade?']) {
      $request->session()->flash('flash-warning', __('errors.withdraw.in-trade-error'));
      return view('withdraw');
    }

    if (Auth::user()['locked?']) {
      $request->session()->flash('flash-warning', __('errors.withdraw.user-locked-error'));
      return view('withdraw');
    }

    $requested_items = $request->input('items.*'); // NOTE: items have to be passed as an array

    // If user selected more that 100 items which is the limit for trade
    if (count($requested_items) > 100) {
      $request->session()->flash('flash-warning', __('errors.withdraw.to_much_selected_items-error'));
      return view('withdraw');
    }

    $data = ['app_id' => 1, 'filter_in_trade' => true]; // data for a request, 1 stands for vgo skins

    $inventory = IUser::getInventory(config('opskins.api_key'), $data);
    $inventory = json_decode($inventory->getBody(), true); // With true parameter so it wil be an assocation table

    if ($inventory['status'] != 1) {
      $request->session()->flash('flash-warning', __('errors.withdraw.unknown_error')); // TODO:
      return view('withdraw');
    }

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
      return view('withdraw');
    }

    $value = 0;

    foreach ($inventory['response']['items'] as $item) {
      $value += $item['suggested_price'] * 10; // * 10 because on this site 1$ == 1000 coins
    }

    if (Auth::user()['coins'] < $value) {
      $request->session()->flash('flash-warning', __('errors.withdraw.not-enough-coins'));
      return view('withdraw');
    }

    $user = Auth::user();

    $user->coins = $user['coins'] - $value;
    $user['in_trade?'] = true; // TODO: 
      
    $user->save();

    $secret_code = random_bytes(6);

    $two_factor = new PHPGangsta_GoogleAuthenticator;
    $secret = config('opskins.2fa_secret');

    $data = [
      'twofactor_code' => $two_factor->getCode($secret),
      'steam_id' => Auth::user()['steamid'],
      'items_to_send' => implode(',', $requested_items),
      'expiration_time' => 1 * 60 * 60, // 1 hour
      'message' => 'Withdrawal from XXX, total value: ' . $value . 'secret: ' . $sercret_code // TODO:
    ];

    $offer = ITrade::sendOfferToSteamId(config('opskins.api_key'), $data);
    $offer = json_decode($offer, true);

    if ($offer['status'] != 1) {
      $request->session()->flash('flash-warning', __('errors.withdraw.unknown_error')); // TODO:
      return view('withdraw');
    }

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
    $request->session()->flash('flash-success', __('trades.offer-sent'));
    return view('withdraw');
  }
}
