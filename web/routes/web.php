<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'HomeController@index');


// Route::get('/', function () {
//   return view('jackpot');
// });

// Route::get('/login', 'SessionController@login');
Route::get('/logout', 'SessionController@logout');

Route::get('/login', 'SessionController@redirectToSteam')->name('auth.steam');
Route::get('/login/handle', 'SessionController@handle')->name('auth.steam.handle');

Route::namespace('Admin')->middleware('auth:admin')->group(function () {
  Route::get('/admin', 'HomeController@dashboard');
});
