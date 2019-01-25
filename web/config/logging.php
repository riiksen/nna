<?php

use Monolog\Handler\StreamHandler;

return [

  /*
  |--------------------------------------------------------------------------
  | Default Log Channel
  |--------------------------------------------------------------------------
  |
  | This option defines the default log channel that gets used when writing
  | messages to the logs. The name specified in this option should match
  | one of the channels defined in the "channels" configuration array.
  |
  */

  'default' => env('LOG_CHANNEL', 'stack'),

  /*
  |--------------------------------------------------------------------------
  | Log Channels
  |--------------------------------------------------------------------------
  |
  | Here you may configure the log channels for your application. Out of
  | the box, Laravel uses the Monolog PHP logging library. This gives
  | you a variety of powerful log handlers / formatters to utilize.
  |
  | Available Drivers: "single", "daily", "slack", "syslog",
  |                    "errorlog", "monolog",
  |                    "custom", "stack"
  |
  */

  'channels' => [
    'stack' => [
      'driver' => 'stack',
      'channels' => ['single'], // ['single', 'slack'], // just for dev
    ],

    'single' => [
      'driver' => 'single',
      'path' => storage_path('logs/laravel.log'),
      'level' => 'debug',
    ],

    'daily' => [
      'driver' => 'daily',
      'path' => storage_path('logs/laravel.log'),
      'level' => 'debug',
      'days' => 7,
    ],

    'slack' => [
      'driver' => 'slack',
      'url' => env('LOG_SLACK_WEBHOOK_URL'),
      'username' => 'VGOSite Logger',
      'emoji' => ':boom:',
      // 'level' => 'critical',
    ],

    'stderr' => [
      'driver' => 'monolog',
      'handler' => StreamHandler::class,
      'with' => [
        'stream' => 'php://stderr',
      ],
    ],

    'syslog' => [
      'driver' => 'syslog',
      'level' => 'debug',
    ],

    'errorlog' => [
      'driver' => 'errorlog',
      'level' => 'debug',
    ],
  ],

  /*
  |--------------------------------------------------------------------------
  | Slack Webhook URL
  |--------------------------------------------------------------------------
  |
  | Incoming Webhooks are a simple way to post messages from external sources
  | into Slack. You can read more about it and how to create yours
  | here: https://api.slack.com/incoming-webhooks
  |
  */

  'slack_webhook_url' => env('SLACK_WEBHOOK_URL', ''),

];
