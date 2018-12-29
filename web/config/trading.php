<?php

return [

  /**
   * API Key for opskins trade support
   */
  'api_key' => env('OPSKINS_API_KEY', ''),

  /**
   * Two factor authorization secret for opskins trading
   */
  '2fa_secret' => env('OPSKINS_TWOFACTOR_SECRET', ''),

  /**
   * Minimum value that trade needs to be worth to be logged
   */
  'min_log_value' => env('TRADE_MINIMUM_LOGGING_VALUE', 0),

];
