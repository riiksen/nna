<?php

namespace App\Http\Middleware;

use Closure;

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
    /*
     * Permission array
     */
    if (strpos($permission, ';') !== false) {
      $permissions = explode(';', $permission);
      $access = access()->allowMultiple($permissions, ($needsAll === 'true' ? true : false));
    } else {
      /**
       * Single permission.
       */
      $access = access()->allow($permission);
    }

    if (!$access) {
      return redirect()->route('frontend.index')->withFlashDanger(trans('auth.general_error'));
    }

    return $next($request);
  }
}


class RouteNeedsPermission {
  public function handle($request, Closure $next, $permission, $needsAll = false) {
    if ($user = Auth::user()) {
      if (strpos($permission, ';') !== false) {
        $permissions = explode(';', $permission);
        $access = $user->hasPermissions($permissions, $needsAll);
      } else {
        $access = $user->hasPermission($permission);
      }

      if ($access) {

      }
    }

    return redirect()->route('frontstage.index')->
  }
}