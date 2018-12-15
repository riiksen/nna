<?php

namespace App\Models\Traits;

trait TradeRelationship {
  /**
   * Get user that created this withdraw
   */
  public function user() {
    $this->belongsTo('App\Models\User');
  }
}
