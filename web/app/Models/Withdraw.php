<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Withdraw extends Model {
  /**
   * Get user that created this withdraw
   */
  public function user() {
    $this->belongsTo('App\Models\User');
  }
}
