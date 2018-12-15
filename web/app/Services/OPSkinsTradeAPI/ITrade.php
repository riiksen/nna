<?php

namespace App\Services\OPSkinsTradeAPI;

trait ITrade {
  public function cancelOffer($api_key, $data) {
    $url = 'https://api-trade.opskins.com/ITrade/CancelOffer/v1/';
    $method = 'POST';

    $response = makeRequest($url, $method, $api_key, $data);

    return $response;
  }

  public function acceptOffer($api_key, $data) {
    $url = 'https://api-trade.opskins.com/ITrade/AcceptOffer/v1/';
    $method = 'POST';

    $response = makeRequest($url, $method, $api_key, $data);

    return $response;
  }

  public function getUserInventoryFromSteamId($api_key, $data) {
    $url = 'https://api-trade.opskins.com/ITrade/GetUserInventoryFromSteamId/v1/';
    $method = 'GET';

    $response = makeRequest($url, $method, $api_key, $data);

    return $response;
  }

  public function sendOfferToSteamId($api_key, $data) {
    $url = 'https://api-trade.opskins.com/ITrade/SendOfferToSteamId/v1/';
    $method = 'POST';

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
