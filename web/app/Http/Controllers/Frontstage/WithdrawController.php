<?php

namespace App\Http\Controllers\Frontstage;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Services\OPSkinsTradeAPI\ITrade;
use App\Services\OPSkinsTradeAPI\IUser;
use App\Services\OPSkinsTradeAPI\IItem;

use Curl\Curl;

class WithdrawController extends Controller {
  public function index() {
    return view('frontstage.withdraw');
  }

  public function withdraw(Request $request) {
    $data = array(
      'steamid' => Auth::user()['steamid'],
      'items' => $request->input('items.*'), // NOTE IMPORTANT: items IS A ARRAY
    );

    $curl = new Curl();
    // $curl->setDefaultJsonDecoder
    $curl->setHeader('Content-Type', 'application/json');
    $curl->post('', $data); //TODO: Insert address here
    // TODO: Do something with $curl->response
  }

  public function handle(Request $request) {
    if (Auth::user()['in_trade?']) {
      $request->session()->flash('flash-warning', __('errors.withdraw.in-trade-error'));
      return view('frontstage.withdraw');
    }

    if (Auth::user()['locked?']) {
      $request->session()->flash('flash-warning', __('withdraw.user-locked-error'));
      return view('frontstage.withdraw');
    }

    // If user selected more that 100 items which is the limit for trade
    if (count($request->input('items.*')) < 100) {
      $request->session()->flash('flash-warning', __('errors.withdraw.to_much_selected_items-error'));
      return view('frontstage.withdraw');
    }

    // TODO: See if i can replace this with /IItem/GetItemsById/v1/ endpoint
    // exactly if tradable in IItem object means if it's currently in trade

    $data = ['app_id' => 1, 'filter_in_trade' => true]; // data for a request, 1 stands for vgo skins

    $inventory = IUser::getInventory(env('OPSKINS_API_KEY'), $data);
    $inventory = json_decode($inventory->getBody(), true); // With true parameter so it wil be an assocation table

    $items_difference = array_diff($request->input('items.*'), $inventory['response']['items']);

    if (count($items_difference != 0)) { // User requested items that are not present in our inventory or are in trade
      $request->session()->flash('flash-warning', __('errors.withdraw.items-error'));
      return view('frontstage.withdraw');
    }


  }
}
