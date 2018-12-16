<?php

namespace App\Services\OPSkinsTradeAPI;

class ITrade {
  public static function cancelOffer($api_key, $data) {
    $url = 'https://api-trade.opskins.com/ITrade/CancelOffer/v1/';
    $method = 'POST';

    $response = self::makeRequest($url, $method, $api_key, $data);

    return $response;
  }

  public static function acceptOffer($api_key, $data) {
    $url = 'https://api-trade.opskins.com/ITrade/AcceptOffer/v1/';
    $method = 'POST';

    $response = self::makeRequest($url, $method, $api_key, $data);

    return $response;
  }

  public static function getUserInventoryFromSteamId($api_key, $data) {
    $url = 'https://api-trade.opskins.com/ITrade/GetUserInventoryFromSteamId/v1/';
    $method = 'GET';

    $response = self::makeRequest($url, $method, $api_key, $data);

    return $response;
  }

  public static function getUserInventory($data) {
    $url = 'https://api-trade.opskins.com/ITrade/GetUserInventory/v1/';
    $method = 'GET';

    $response = self::makeRequest($url, $method, '', $data);

    return $response;
  }

  public static function sendOfferToSteamId($api_key, $data) {
    $url = 'https://api-trade.opskins.com/ITrade/SendOfferToSteamId/v1/';
    $method = 'POST';

    $response = self::makeRequest($url, $method, $api_key, $data);

    return $response;
  }

  private static function makeRequest($url, $method, $api_key, $data) {
    $client = new \GuzzleHttp\Client();

    $response = $client->request($method, $url, [
      'http_errors' => false,
      'headers' => [
        'Authorization' => 'Basic ' . base64_encode($api_key)
      ],

      $method == 'POST' ? 'form_params' : 'query' => $data
    ]);

    return $response;
  }
}
