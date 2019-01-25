<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RenameSteamidToRecipentSteamIdInTrades extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    Schema::table('trades', function (Blueprint $table) {
      $table->renameColumn('steamid', 'recipent_steam_id');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    Schema::table('trades', function (Blueprint $table) {
      $table->renameColumn('recipent_steam_id', 'steamid');
    });
  }
}
