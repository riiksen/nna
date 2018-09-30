<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

class HomeController extends Controller {
  public function dashboard() {
    return view('admin.dashboard');
  }

  public function index() {

  }
}
