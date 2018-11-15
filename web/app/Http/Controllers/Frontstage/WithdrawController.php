<?php

namespace App\Http\Controllers\Frontstage;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class WithdrawController extends Controller {
  public function index() {
    return view('frontstage.withdraw');
  }

  public function withdraw(Request $request) {
    
  }
}
