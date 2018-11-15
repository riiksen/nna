<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Auth;

class AppServiceProvider extends ServiceProvider {
  /**
   * Bootstrap any application services.
   *
   * @return void
   */
  public function boot() {
    // Set the default string length for Laravel5.4
    // https://laravel-news.com/laravel-5-4-key-too-long-error
    Schema::defaultStringLength(191);

    $this->registerBladeExtensions();
  }

  /**
   * Register any application services.
   *
   * @return void
   */
  public function register() {
    //
  }

  protected function registerBladeExtensions() {
    Blade::if('permission', function ($permission) {
      return Auth::user()->hasPermission($permission);
    });
  }
}
