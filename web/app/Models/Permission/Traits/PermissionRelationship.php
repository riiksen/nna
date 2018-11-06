<?php

namespace App\Models\Traits;

use App\Models\Role;

trait PermissionRelationship {
  public function roles() {
    return $this->belongsToMany(Role::class, 'permission_role', 'permission_id', 'role_id');
  }
}