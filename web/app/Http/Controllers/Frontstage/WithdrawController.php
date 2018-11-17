<?php

namespace App\Http\Controllers\Frontstage;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

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
    $curl->post('', $data) //TODO: Insert address here
    // TODO: Do something with $curl->response
  }

  public function handle(Request $request) {

  }
}
