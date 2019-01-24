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
  'min_slack_log_val' => env('TRADE_MINIMUM_VALUE_FOR_SLACK_LOGGING', 0),

  /**
   * Slack channel where trades will be logged on
   */
  'slack_log_channel' => env('TRADE_SLACK_CHANNEL_FOR_LOGGING', '#trades'),

  /**
   * Key used to create trade signatures
   */
  'signing_key' => env('TRADE_SIGNING_KEY', ''),

];
