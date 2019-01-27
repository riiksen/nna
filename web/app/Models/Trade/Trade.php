<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Trade extends Model {
  /**
   * The table associated with the model.
   *
   * @var string
   */
  protected $table = 'trades';

  protected $fillable = [
    'opskins_offer_id',
    'state',
    'recipent_steam_id',
    'value',
    'trade_signature',
    'type'
  ];
}
