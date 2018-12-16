<?php

namespace App\Http\Controllers\Frontstage;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\OPSkinsTradeAPI\ITrade;
use App\Services\OPSkinsTradeAPI\IUser;

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
      // TODO: Flash error message and abort
      $request->session()->flash('flash-warning', __('errors.withdraw.in-trade-error'));

    }

    if (Auth::user()['locked?']) {
      // TODO: Flash error message and abort
      $request->session()->flash('flash-warning', ''); // TODO: Write error message and i18n
    }

    // If user selected more that 100 items which is the limit for trade
    if (count($request->input('items.*')) < 100) {
      // TODO: Flash error message and abort
      $request->session()->flash('flash-warning', 'You selected more than 100 items, which is global limit for trading'); // TODO: Write better err message and i18n
    }

    $data = ['app_id' => 1]; // data for a request

    $inventory = IUser::getInventory(env('OPSKINS_API_KEY'), $data);

    $inventory[''];
    //TODO: End this
  }
}
