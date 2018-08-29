<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Deposit extends Model {
  /**
   * Get user that created this deposit
   */
  public function user() {
    $this->belongsTo('App\User');
  }
}
