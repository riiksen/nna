<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddOpskinsOfferIdToTrades extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    Schema::table('trades', function (Blueprint $table) {
      $table->string('opskins_offer_id');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    Schema::table('trades', function (Blueprint $table) {
      $table->dropColumn('opskins_offer_id');
    });
  }
}
