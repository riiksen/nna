<?php

namespace App\Http\Controllers\Frontstage;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class HomeController extends Controller {
  public function index() {
    return view('frontstage.jackpot');
  }
}
