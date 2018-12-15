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
  // Route::get('/logout', 'Auth\LoginController@logout')->name('logout');

  // Route::get('/account', 'AccountController@index')->name('account');

  Route::get('/withdraw', 'WithdrawController@index')->name('withdraw');
  // Route::post('/withdraw', 'WithdrawController@handle')->name('withdraw.handle');

  Route::get('/deposit', 'DepositController@index')->name('deposit');
  // Route::post('/deposit', 'DepositsController@handle')->name('deposit.handle');

  Route::group(['middleware' => 'auth'], function() {
    Route::get('/logout', 'Auth\LoginController@logout')->name('logout');
<<<<<<< HEAD
    Route::post('/withdraw', 'WithdrawController@handle')->name('withdraw.handle');
    Route::post('/deposit', 'DepositsController@handle')->name('deposit.handle');

    Route::post('/loginToSocket','SessionController@loginToSocket');
  });
=======
>>>>>>> 9810c099fe991f576b00349f79ab4bc0500ed25d


    // Limit the requests that are passed to the node worker to 20 requests per minute
    Route::group(['middleware' => 'throttle:20,1'], function() {
      Route::post('/withdraw', 'WithdrawController@handle')->name('withdraw.handle');
      Route::post('/deposit', 'DepositController@handle')->name('deposit.handle');
    });
  });
});

Route::group(['namespace' => 'Backstage', 'prefix' => 'backstage', 'as' => 'backstage.', 'middleware' => 'admin'], function() {
  Route::get('/', 'HomeController@dashboard')->name('dashboard');

  Route::resource('deposits', 'DepositsController')->only(['index', 'show']);
  Route::resource('withdraws', 'WithdrawsController')->only(['index', 'show']);

  Route::resource('users', 'UsersController')->only(['index', 'show']);
  Route::resource('permissions', 'PermissionsController')->only(['index', 'show']);
  Route::resource('roles', 'RolesController');
});
