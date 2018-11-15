<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Models\Traits\UserRelationship;
use App\Models\Traits\UserAccess;

class User extends Authenticatable {
  use Notifiable,
      UserRelationship,
      UserAccess,
      SoftDeletes;

  /**
   * The table associated with the model.
   *
   * @var string
   */
  protected $table = 'users';

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
    'username',
    'steamid',
    'avatar',
  ];

  // public function isAdmin() {
  //   return $this->is_admin;
  // }

  /** TODO: See if it works
   * Lock the account
   */
  // public function lock() {
  //   $this->update(['locked'] => true);
  // }

  /** TODO: See if it works
   * Unlock the account
   */
  // public function unlock() {
  //   $this->update(['locked'] => false);
  // }

  /**
   * Overrides the method to ignore the remember token.
   */
  public function setAttribute($key, $value) {
    $isRememberTokenAttribute = $key == $this->getRememberTokenName();
    if (!$isRememberTokenAttribute) {
      parent::setAttribute($key, $value);
    }
  }
}