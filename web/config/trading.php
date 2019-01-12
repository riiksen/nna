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
   * Minimum value that trade needs to be worth to be logged to slack
   */
  'min_slack_log_value' => env('TTRADE_MINIMUM_VALUE_FOR_SLACK_LOGGING', 0),

  /**
   * Key used to create trade signatures
   */
  'signing_key' => env('TRADE_SIGNING_KEY', ''),

];
