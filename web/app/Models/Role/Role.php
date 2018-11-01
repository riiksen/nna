<?php

namespace App\Models\Role;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Models\Role\Traits\RoleRelationship;

class Role extends Model {
  use SoftDeletes,
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