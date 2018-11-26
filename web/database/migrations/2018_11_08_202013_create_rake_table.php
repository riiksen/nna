<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRakeTable extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    Schema::create('rake', function(Blueprint $table) {
      $table->increments('id');
      $table->smallInteger('bot_id')->unsigned();
      $table->string('item_id');
      $table->string('game');
      $table->integer('game_id')->unsigned();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    Schema::drop('rake');
  }
}
