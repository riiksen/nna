<?php

namespace App\Http\Controllers\Backstage;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class HomeController extends Controller {
  public function dashboard() {
    return view('admin.dashboard');
  }

  public function index() {

  }
}
