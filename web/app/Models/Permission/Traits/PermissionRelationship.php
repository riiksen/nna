<?php

namespace App\Models\Permission\Traits;

use App\Models\Role\Role;

trait PermissionRelationship {
  public function roles() {
    return $this->belongsToMany(Role::class, 'permission_role', 'permission_id', 'role_id');
  }
}