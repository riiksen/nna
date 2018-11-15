<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Blade;


class BladeServiceProvider extends ServiceProvider {
  /**
   * Bootstrap services.
   *
   * @return void
   */
  public function boot() {
    //
  }

  /**
   * Register services.
   *
   * @return void
   */
  public function register() {
    Blade::directive('permission', function ($permission) {
      return "<?php if (Auth::user()->hasPermission({$permission})): ?>";
    });
  }
}
