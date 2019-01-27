<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeSecretcodeToTradeSignature extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    Schema::table('trades', function (Blueprint $table) {
      $table->dropColumn('secretcode');
      $table->string('trade_signature', 64)->nullable();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    Schema::table('trades', function (Blueprint $table) {
      $table->dropColumn('trade_signature');
      $table->string('secretcode', 12);
    });
  }
}
