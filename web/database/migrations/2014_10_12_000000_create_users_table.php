<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    Schema::create('users', function (Blueprint $table) {
      $table->increments('id')->unsigned();
      $table->string('username');
      $table->string('steamid',17)->unique();
      $table->string('avatar');
      $table->integer('coins')->unsigned()->default(0);
      $table->boolean('locked')->default(false);
      $table->smallInteger('rank')->default(0);
      // $table->string('used_refferal');
      // $table->string('password');
      // $table->rememberToken();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    Schema::dropIfExists('users');
  }
}
