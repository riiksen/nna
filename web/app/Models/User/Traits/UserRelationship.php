<?php

namespace App\Models\Traits;



trait UserRelationship {
  // public function roles() {
  //   
  // }

  // public function withdraws() {
  //   return $this->hasMany(App\Models\Withdraw::class);
  // }
  //
  // public function deposits() {
  //   return $this->hasMany(App\Models\Deposit::class);
  // }

  /**
   * Get user withdraws 
   */
  public function withdraws() {
    return $this->hasMany('App\Models\Withdraw');
  }

  /**
   * Get user deposits 
   */
  public function deposits() {
    return $this->hasMany('App\Models\Deposit');
  }

  /** FIXME
   * Get user coinflips plays
   */
  public function coinflips() {
    return $this->hasMany('App\Models\Coinflip');
  }

  /** FIXME
   * Get user jackpot plays
   */
  public function jackpots() {
    return $this->hasManyThrough('App\Models\Jackpot', 'App\Models\JackpotParticipant');
  }
}