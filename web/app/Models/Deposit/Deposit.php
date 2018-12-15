<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Deposit extends Model {
  /**
   * The table associated with the model.
   *
   * @var string
   */
  protected $table = 'deposits';

  /**
   * Get user that created this deposit
   */
  public function user() {
    $this->belongsTo('App\Models\User');
  }
}
