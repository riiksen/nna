<?php

namespace App\Services\OPSkinsTradeAPI;

use GuzzleHttp\Client as GuzzleClient;

trait IUser {
  public function getInventory($api_key, $data) {
    $url = 'https://api-trade.opskins.com/IUser/GetInventory/v1/';
    $method = 'GET';

    $response = makeRequest($url, $method, $api_key, $data);

    return $response;
  }

  private function makeRequest($url, $method, $api_key, $data) {
    $client = new GuzzleHttp\Client();

    $response = $client->request($method, $url, [
      'headers' => [
        'Authorization' => base64_encode($api_key)
      ],

      $method == 'POST' ? 'form_params' : 'query' => $data
    ]);
  }
}
