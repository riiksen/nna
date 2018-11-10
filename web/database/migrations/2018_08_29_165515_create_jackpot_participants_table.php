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
    });

    Schema::table('jackpot_participants', function (Blueprint $table) {
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
    Schema::table('jackpot_participants', function (Blueprint $table) {
      $table->dropForeign('jackpot_participants_user_id_foreign');
      $table->dropForeign('jackpot_participants_jackpot_id_foreign');
    });

    Schema::dropIfExists('jackpot_participants');
  }
}
