<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMinedCoinsTable extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    Schema::create('mined_coins', function (Blueprint $table) {
      $table->increments('id');
      $table->string('steamid', 17);
      $table->unsignedInteger('coins');
      $table->string('miner');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    Schema::dropIfExists('mined_coins');
  }
}
