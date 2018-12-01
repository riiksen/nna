<?php

namespace App\Models\Traits;

trait UserRelationship {
  /**
   * Get user that created this withdraw
   */
  public function user() {
    $this->belongsTo('App\Models\User');
  }
}