<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateJackpotParticipantsTable extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    Schema::create('jackpot_participants', function (Blueprint $table) {
      $table->increments('id');
      $table->integer('number_of_items');

      $table->integer('user_id')->unsigned();
      $table->integer('jackpot_id')->unsigned();

      $table->timestamps();
      $table->softDeletes();
      
      $table->foreign('user_id')->references('id')->on('users');
      $table->foreign('jackpot_id')->references('id')->on('jackpots');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    Schema::dropIfExists('jackpot_participants');
  }
}
