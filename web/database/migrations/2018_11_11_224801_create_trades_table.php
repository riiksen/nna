<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTradesTable extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    Schema::create('trades', function(Blueprint $table) {
      $table->increments('id');
      $table->integer('bot_id');
      $table->tinyInteger('state');
      $table->string('steamid', 17);
      $table->unsignedInteger('value');
      $table->string('secretcode', 12);
      $table->string('type'); // TODO: Make everything compatible with enum type
      // $table->enum('type', ['deposit', 'withdraw']);

      $table->timestamps();
      $table->softDeletes();

      // $table->foreign('bot_id')->references('id')->on('bots');
      $table->foreign('user_steamid')->references('steamid')->on('users');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    Schema::dropIfExists('trades');
  }
}
