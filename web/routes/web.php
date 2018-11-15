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

Route::group(['namespace' => 'Frontstage', 'as' => 'frontstage.'], function() {
  Route::get('/', 'HomeController@index')->name('index');

  Route::get('/login', 'SessionController@redirectToSteam')->name('login');
  Route::get('/login/handle', 'SessionController@handle')->name('login.handle');
  // Route::get('/logout', 'SessionController@logout')->name('logout');
  Route::get('/logout', 'Auth\LoginController@logout')->name('logout');

  // Route::get('/account', 'AccountController@index')->name('account');

  // Route::get('/withdraw', '')
  // Route::post('/withdraw')
  // 
  // Route::get('/deposit', '')
  // Route::post('/deposit', '')

});

Route::group(['namespace' => 'Backstage', 'prefix' => 'backstage', 'as' => 'backstage.', 'middleware' => 'admin'], function() {
  Route::get('/', 'HomeController@dashboard')->name('dashboard');

  Route::resource('deposits', 'DepositsController')->only(['index', 'show']);
  Route::resource('withdraws', 'WithdrawsController')->only(['index', 'show']);

  Route::resource('users', 'UsersController')->only(['index', 'show']);
  Route::resource('roles', 'RolesController')->only(['index', 'show']);
  Route::resource('permissions', 'PermissionsController')->only(['index', 'show']);
});