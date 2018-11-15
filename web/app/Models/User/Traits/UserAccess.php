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
    foreach ($this->permissions as $perm) {
      if (is_numeric($role)) {
        if ($perm->id == $role) {
          return true;
        }
      }

      if ($perm->name === $role) {
        return true;
      }
    }

    foreach ($this->roles as $role) {
      if ($role->all) {
        return true;
      }

      foreach ($role->permissions as $perm) {
        if (is_numeric($role)) {
          if ($perm->id == $role) {
            return true;
          }
        }

        if ($perm->name === $role) {
          return true;
        }
      }
    }

    return false;
  }

  public function hasRoles($roles) {
    return true;
  }
}