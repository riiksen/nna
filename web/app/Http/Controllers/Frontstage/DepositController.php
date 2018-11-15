<?php

namespace App\Http\Controllers\Frontstage;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DepositController extends Controller {
  public function index() {
    return view('frontstage.deposit');
  }

  public function deposit(Request $request) {

  }
}
