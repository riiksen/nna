<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Deposit extends Model {
  /**
   * Get user that created this deposit
   */
  public function user() {
    $this->belongsTo('App\Models\User');
  }
}
