<?php

namespace App\Models\Traits;

trait RoleRelationship {
  public function users() {
    return $this->belongsToMany('App\Models\User', 'role_user', 'role_id', 'user_id');
  }

  public function permissions() {
    return $this->belongsToMany('App\Models\Permission', 'permission_role', 'role_id', 'permission_id')->orderBy('display_name', 'asc');
  }
}