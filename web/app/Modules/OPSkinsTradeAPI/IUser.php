<?php

namespace App\Modules\OPSkinsTradeAPI;

use GuzzleHttp\Client as GuzzleClient;

class IUser {
  public static function getInventory($api_key, $data) {
    $url = 'https://api-trade.opskins.com/IUser/GetInventory/v1/';
    $method = 'GET';

    $response = self::makeRequest($url, $method, $api_key, $data);

    return $response;
  }

  private static function makeRequest($url, $method, $api_key, $data) {
    $client = new \GuzzleHttp\Client();

    $response = $client->request($method, $url, [
      'http_errors' => false,
      'headers' => [
        'Authorization' => 'Basic ' . base64_encode($api_key . ':')
      ],

      $method == 'POST' ? 'form_params' : 'query' => $data
    ]);

    return $response;
  }
}
