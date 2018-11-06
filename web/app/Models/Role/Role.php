<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Models\Traits\RoleAccess;
use App\Models\Traits\RoleRelationship;

class Role extends Model {
  use SoftDeletes,
      RoleAccess,
      RoleRelationship;

  /**
   * The database table used by the model.
   *
   * @var string
   */
  protected $table = 'role';

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = ['name', 'all'];
}