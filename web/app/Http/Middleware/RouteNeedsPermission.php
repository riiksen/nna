<?php

namespace App\Http\Middleware;

use Closure;

use Auth;

/**
 * Class RouteNeedsRole.
 */
class RouteNeedsPermission {
  /**
   * @param $request
   * @param Closure $next
   * @param $permission
   * @param bool $needsAll
   *
   * @return mixed
   */
  public function handle($request, Closure $next, $permission, $needsAll = false) {
    if ($user = Auth::user()) {
      /**
       * Permission array
       */
      if (strpos($permission, ';') !== false) {
        $permissions = explode(';', $permission);
        $access = $user->hasPermissions($permissions, $needsAll);
      } else {
        /**
         * Single permission.
         */
        $access = $user->hasPermission($permission);
      }

      if ($access) {
        return $next($request);
      }
    }

    // TODO: Flash error
    $request->session()->flash('flash-error', __('route.no-permission-error'));
    return redirect()->route('frontstage.index');
  }
}
