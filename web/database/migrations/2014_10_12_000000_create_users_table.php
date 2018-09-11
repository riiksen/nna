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
      $table->increments('id');
      $table->string('username');
      $table->string('steamid')->unique();
      $table->string('avatar');
      $table->integer('coins');
      $table->boolean('locked')->default(false);
      $table->boolean('is_admin')->default(false);
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
