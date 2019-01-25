<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Modules\OPSkinsTradeAPI\ITrade;
use App\Modules\OPSkinsTradeAPI\IUser;

use App\Models\Trade;
use App\Models\User;

class DepositController extends Controller {
  public function index() {
    return view('deposit');
  }

  // TODO: Add slack logging
  // TODO: Testing
  public function handle(Request $request) {
    $validated_input = $request->validate([
      'items' => 'required|array|max:100',
      'items.*' => 'unique',
      'items.*.id' => 'required|distinct|numeric' // TODO: Finish validation rules for input
    ]);

    if (is_array($request->input('items.*'))) {
      $request->session()->flash('flash-warning', __('trades.errors.invalid_input'));
      return view('deposit');
    }

    if (Auth::user()['locked?']) {
      $request->session()->flash('flash-warning', __('trades.errors.user_locked'));
      return view('deposit');
    }

    $requested_items = $request->input('items.*'); //NOTE: items have to be passed as an array

    // If user selected more that 100 items which is the limit for trade
    if (count($requested_items) > 100) {
      $request->session()->flash('flash-warning', __('trades.errors.selected_more_than_100_items'));
      return view('deposit');
    }

    $data = ['steam_id' => Auth::user()['steamid'], 'app_id' => 1]; // data for a request, 1 stands for vgo skins

    $inventory = ITrade::getUserInventoryFromSteamId(config('trading.api_key'), $data);
    $inventory = json_decode($inventory->getBody(), true); // With true parameter so it wil be an assocation table

    if ($inventory['status'] != 1) {
      $request->session()->flash('flash-warning', __('trades.errors.unknown_error'));
      return view('deposit');
    }

    array_filter($inventory['response']['items'], function ($item) use ($requested_items) {
      foreach ($requested_items as $requested_item) {
        if ($item['id'] == $requested_item) {
          return true;
        }
      }

      return false;
    });

    // User requested items that are not present in his inventory
    if (count($inventory['response']['items']) != count($requested_items)) {
      $request->session()->flash('flash-warning', __('trades.errors.items_not_available'));
      return view('deposit');
    }

    $value = 0;

    foreach ($inventory['response']['items'] as $item) {
      $value += $item['suggested_price'] * 10; // * 10 because on this site 1$ == 1000 coins and the suggested price is in cents
    }

    $trade_signature = hash_hmac('sha256', '', config('trading.signing_key'));

    $two_factor = new PHPGangsta_GoogleAuthenticator;
    $secret = config('trading.2fa_secret');

    $data = [
      'twofactor_code' => $two_factor->getCode($secret),
      'steam_id' => Auth::user()['steamid'],
      'items_to_receive' => implode(',', $requested_items),
      'message' => __('trades.deposit.trade_message', ['value' => $value, 'secret' => $trade_signature]),
    ];

    $offer = ITrade::sendOfferToSteamId(config('trading.api_key'), $data);
    $offer = json_decode($offer, true);

    if ($offer['status'] != 1) {
      // TODO: Better error handling
      // TODO: Log error
      $request->session()->flash('flash-warning', __('trades.errors.could_not_send_trade'));
      return view('deposit');
    }

    Trade::create([
      'opskins_offer_id' => $offer['result']['offer']['id'],
      /* 'bot_id' => 0, // TODO: Support for multiple bots accounts */
      'state' => 2, // STATE_ACTIVE
      'recipent_steam_id' => $offer['result']['offer']['recipent']['steam_id'],
      'value' => $value,
      'secretcode' => $trade_signature, // NOTE: We don't need to store this in database cause we can calculate it any time for given trade... guess what... that's how hmac's works
      'type' => 'deposit',
    ]);

    // Everything went ok, no errors... probably
    $request->session()->flash('flash-success', __('trades.sent-offer'));
    return view('deposit');
  }
}
