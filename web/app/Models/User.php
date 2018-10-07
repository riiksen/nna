<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable {
  use Notifiable,
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

  public function isAdmin() {
    return $this->is_admin;
  }

  /**
   * Get user withdraws 
   */
  public function withdraws() {
    return $this->hasMany('App\Withdraw');
  }

  /**
   * Get user deposits 
   */
  public function deposits() {
    return $this->hasMany('App\Deposit');
  }
  
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

  /** FIXME
   * Get user coinflips plays
   */
  public function coinflips() {
    return $this->hasMany('App\Coinflip');
  }

  /** FIXME
   * Get user jackpot plays
   */
  public function jackpots() {
    return $this->hasManyThrough('App\Jackpot', 'App\JackpotParticipant');
  }

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
