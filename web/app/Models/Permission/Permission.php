<?php

namespace App\Models\Permission;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Models\Permission\Traits\PermissionRelationship;

class Permission extends Model {
  use SoftDeletes,
      PermissionRelationship;

  /**
   * The database table used by the model.
   *
   * @var string
   */
  protected $table = 'permissions';

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = ['name', 'display_name'];  
}