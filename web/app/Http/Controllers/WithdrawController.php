<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Modules\OPSkinsTradeAPI\ITrade;
use App\Modules\OPSkinsTradeAPI\IUser;

use App\Models\Trade;
use App\Models\User;

use Maknz\Slack\Client as SlackClient;

class WithdrawController extends Controller {
  public function index() {
    return view('withdraw');
  }

  // TODO: Add slack logging
  // TODO: Better error api error handling
  // TODO: Add bypass of in_trade? with permission
  // TODO: Testing
  public function handle(Request $request) {
    $validated_input = $request->validate([
      'items' => 'required|array|max:100',
      'items.*' => 'unique',
      'items.*.id' => 'distinct|numeric' // TODO: Finish validation rules for input
    ]);

    if (is_array($request->input('items.*'))) {
      $request->session()->flash('flash-warning', __('trades.errors.invalid_input'));
      return view('withdraw');
    }

    if (Auth::user()['in_trade?']) {
      $request->session()->flash('flash-warning', __('trades.errors.in_trade'));
      return view('withdraw');
    }

    if (Auth::user()['locked?']) {
      $request->session()->flash('flash-warning', __('trades.errors.user_locked'));
      return view('withdraw');
    }

    $requested_items = $request->input('items.*'); // NOTE: items have to be passed as an array
    /* $requested_items_ids = $request->input('items.*.id'); // TODO: Use tihs instead of $requested_items */

    // If user selected more that 100 items which is the limit for opskins trading
    if (count($requested_items) > 100) {
      $request->session()->flash('flash-warning', __('trades.errors.selected_more_than_100_items'));
      return view('withdraw');
    }

    $data = ['app_id' => 1, 'filter_in_trade' => true]; // data for a request, 1 stands for vgo skins

    $inventory = IUser::getInventory(config('trading.api_key'), $data);
    $inventory = json_decode($inventory->getBody(), true); // With true parameter so it wil be an assocation table

    if ($inventory['status'] != 1) {
      $request->session()->flash('flash-warning', __('trades.errors.unknown_error'));
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
      $request->session()->flash('flash-warning', __('trades.errors.items_not_available'));
      return view('withdraw');
    }

    $value = 0;

    foreach ($inventory['response']['items'] as $item) {
      $value += $item['suggested_price'] * 10; // * 10 because on this site 1$ == 1000 coins and the suggested price is in cents
    }

    if (Auth::user()['coins'] < $value) {
      $request->session()->flash('flash-warning', __('trades.errors.not_enough_coins'));
      return view('withdraw');
    }

    $user = Auth::user();

    $user->coins = $user['coins'] - $value;
    $user['in_trade?'] = true; 
      
    $user->save();

    // TODO: Make this a hmac of actually smth
    // TODO: Maybe trim this to like 6 chars
    $trade_signature = hash_hmac('sha256', '', config('trading.signing_key'));

    $two_factor = new PHPGangsta_GoogleAuthenticator;
    $secret = config('trading.2fa_secret');

    $data = [
      'twofactor_code' => $two_factor->getCode($secret),
      'steam_id' => Auth::user()['steamid'],
      'items_to_send' => implode(',', $requested_items),
      'expiration_time' => 1 * 60 * 60, // 1 hour
      'message' => __('trades.withdraw.trade_message', ['value' => $value, 'secret' => $trade_signature]),
    ];

    $offer = ITrade::sendOfferToSteamId(config('trading.api_key'), $data);
    $offer = json_decode($offer, true);

    if ($offer['status'] != 1) {
      // TODO: Return coins
      // TODO: Log error
      $request->session()->flash('flash-warning', __('trades.errors.could_not_send_trade'));
      return view('withdraw');
    }

    // TODO: Make this a job
    // Log trade to the slack channel if value >= trade minimum value for slack logging
    /* if ($value >= config('trading.min_slack_log_val')) { */
    /*   notifyViaSlack(, $value); */
    /* } */

    Trade::create([
      'opskins_offer_id' => $offer['result']['offer']['id'],
      /* 'bot_id' => 0, // TODO: Support for multiple bots accounts */
      'state' => 2, // STATE_ACTIVE
      'recipent_steam_id' => $offer['result']['offer']['recipent']['steam_id'],
      'value' => $value,
      'secretcode' => $trade_signature, // NOTE: No need to store this in database cause we can calculate it any time for given trade... guess what... that's how hmac's works
      'type' => 'withdraw',
    ]);

    // Everything went ok, no errors... probably
    $request->session()->flash('flash-success', __('trades.offer_sent'));
    return view('withdraw');
  }

  private function notifyViaSlack($trade_id, $trade_value) {
    $url = url();

    $client = new SlackClient(config('logging.slack_webhook_url'));

    $message = $client->createMessage();

    $attachments = [
      'title' => '',
      'title_link' => '',
      'fields' => [
        [
          'title' => '' . Auth::user()['steamid'],
          'title_link' => route('admin.users.show', ['user' => Auth::user()['steamid']]),
          'value' => Auth::user()['steamid'],
        ],
        [
          'title' => 'Total value of trade',
          'value' => $trade_value,
        ],
      ],
    ];

    $message->attach($attachments);

    $message->send();
  }
}
