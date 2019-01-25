<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RemoveUselessColumnsFromTrades extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    Schema::table('trades', function (Blueprint $table) {
      $table->dropColumn(['bot_id', 'user_steamid']);
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    Schema::table('trades', function (Blueprint $table) {
      $table->integer('bot_id');
      $table->string('user_steamid');

      $table->foreign('user_steamid')->references('steamid')->on('users');
    });
  }
}
