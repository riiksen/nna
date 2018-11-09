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
      $table->increments('id')->unsigned();
      $table->integer('no_host_items')->comment('Number of host items'); // Number of host items
      $table->integer('vo_host_items')->comment('Value of host items'); // Value of host items
      $table->integer('no_guest_items')->comment('Number of guest items'); // Number of guest items
      $table->integer('vo_guest_items')->comment('Value of guest items'); // Value of guest items

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
      $table->dropForeign('coinflips_host_user_id_foreign');
      $table->dropForeign('coinflips_guest_user_id_foreign');
    });

    Schema::dropIfExists('coinflips');
  }
}
