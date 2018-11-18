<?php

namespace App\Models\Traits;

trait UserAccess {
  public function hasPermission($permission) {
    // Check permissions directly tied to user
    foreach ($this->permissions as $perm) {

      // First check to see if it's an ID
      if (is_numeric($permission)) {
        if ($perm->id == $permission) {
          return true;
        }
      }

      // Otherwise check by name
      if ($perm->name == $permission) {
        return true;
      }
    }

    foreach ($this->roles as $role) {
      // See if role has all permissions
      if ($role->all) {
          return true;
      }

      // Validate against the Permission table
      foreach ($role->permissions as $perm) {

        // First check to see if it's an ID
        if (is_numeric($permission)) {
          if ($perm->id == $permission) {
            return true;
          }
        }
  
        // Otherwise check by name
        if ($perm->name == $permission) {
          return true;
        }
      }
    }

    return false;
  }

  public function hasPermissions($permissions, $needsAll = false) {
    //If not an array, make a one item array
    if (!is_array($permissions)) {
      $permissions = [$permissions];
    }

    //User has to possess all of the permissions specified
    if ($needsAll) {
      $hasPermissions = 0;
      $numPermissions = count($permissions);

      foreach ($permissions as $perm) {
        if ($this->allow($perm)) {
          $hasPermissions++;
        }
      }

      return $numPermissions == $hasPermissions;
    }

    //User has to possess one of the permissions specified
    foreach ($permissions as $perm) {
      if ($this->hasPermission($perm)) {
        return true;
      }
    }

    return false;
  }

  public function hasRole($nameOrId) {
    foreach ($this->roles as $role) {
      //See if role has all permissions
      if ($role->all) {
        return true;
      }

      //First check to see if it's an ID
      if (is_numeric($nameOrId)) {
        if ($role->id == $nameOrId) {
          return true;
        }
      }

      //Otherwise check by name
      if ($role->name == $nameOrId) {
        return true;
      }
    }

    return false;
  }

  public function hasRoles($roles, $needsAll = false) {
    //If not an array, make a one item array
    if (!is_array($roles)) {
      $roles = [$roles];
    }

    //User has to possess all of the roles specified
    if ($needsAll) {
      $hasRoles = 0;
      $numRoles = count($roles);

      foreach ($roles as $role) {
        if ($this->hasRole($role)) {
          $hasRoles++;
        }
      }

      return $numRoles == $hasRoles;
    }

    //User has to possess one of the roles specified
    foreach ($roles as $role) {
      if ($this->hasRole($role)) {
        return true;
      }
    }

    return false;
  }

  public function attahRole($role) {
    if (is_object($role)) {
      $role = $role->getKey();
    }

    if (is_array($role)) {
      $role = $role['id'];
    }

    $this->roles()->attach($role);
  }

  public function detachRole($role) {
    if (is_object($role)) {
      $role = $role->getKey();
    }

    if (is_array($role)) {
      $role = $role['id'];
    }

    $this->roles()->detach($role);
  }

  public function attachRoles($roles) {
    foreach ($roles as $role) {
      $this->attachRole($role);
    }
  }

  public function detachRoles($roles) {
    foreach ($roles as $role) {
      $this->detachRole($role);
    }
  }

  public function attachPermission($permission) {
    if (is_object($permission)) {
      $permission = $permission->getKey();
    }

    if (is_array($permission)) {
      $permission = $permission['id'];
    }

    $this->permissions()->attach($permission);
  }

  public function detachPermission($permission) {
    if (is_object($permission)) {
      $permission = $permission->getKey();
    }

    if (is_array($permission)) {
      $permission = $permission['id'];
    }

    $this->permissions()->detach($permission);
  }

  public function attachPermissions($permissions) {
    foreach ($permissions as $permission) {
      $this->attachPermission($permission);
    }
  }

  public function detachPermissions($permissions) {
    foreach ($permissions as $permission) {
      $this->detachPermission($permission);
    }
  }
}
