<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCoinflipsTable extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    Schema::create('coinflips', function (Blueprint $table) {
      $table->increments('id');

      $table->integer('host_user_id')->unsigned();
      $table->integer('guest_user_id')->unsigned();

      $table->timestamps();
    });

    Schema::table('coinflips', function (Blueprint $table) {
      $table->foreign('host_user_id')->references('id')->on('users');
      $table->foreign('guest_user_id')->references('id')->on('users');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    Schema::table('coinflips', function (Blueprint $table) {
      $table->dropForeign('coinflip_host_user_id_foreign');
      $table->dropForeign('coinflip_guest_user_id_foreign');
    });

    Schema::dropIfExists('coinflips');
  }
}
