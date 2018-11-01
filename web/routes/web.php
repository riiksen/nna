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

// Route::get('lang/{lang}', 'LanguageController@swap');

Route::group(['namespace' => 'Frontstage', 'name' => 'frontstage.'], function() {
  Route::get('/', 'HomeController@index')->name('index');

  Route::get('/login', 'SessionController@redirectToSteam')->name('login');
  Route::get('/login/handle', 'SessionController@handle')->name('login.handle');

  // Route::get('/account', 'AccountController@index')->name('account');
});

Route::group(['namespace' => 'Backstage', 'prefix' => 'backstage', 'name' => 'backstage.', 'middleware' => 'admin'], function() {
  Route::get('/', 'HomeController@dashboard')->name('dashboard');

  // Route::resource('users', 'UserController')->except(['destroy']);
});