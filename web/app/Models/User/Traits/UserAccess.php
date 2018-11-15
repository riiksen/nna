<?php

namespace App\Models\Traits;

trait UserAccess {
  public function hasPermission($permission) {
    return true;
  }

  public function hasPermissions($permissions) {
    return true;
  }

  public function hasRole($role) {
    return true;
  }

  public function hasRoles($roles) {
    return true;
  }
}