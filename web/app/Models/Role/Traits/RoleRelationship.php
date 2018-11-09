<?php

namespace App\Models\Role\Traits;

use App\Models\User\User;
use App\Models\Permission\Permission;

trait RoleRelationship {
  public function users() {
    return $this->belongsToMany(User::class, 'role_user', 'role_id', 'user_id');
  }

  public function permissions() {
    return $this->belongsToMany(Permission::class, 'permission_role', 'role_id', 'permission_id')->orderBy('display_name', 'asc');
  }
}