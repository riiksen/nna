<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Withdraw extends Model {
  /**
   * The table associated with the model.
   *
   * @var string
   */
  protected $table = 'withdraws';
  
  /**
   * Get user that created this withdraw
   */
  public function user() {
    $this->belongsTo('App\Models\User');
  }
}
