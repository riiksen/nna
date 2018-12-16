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
      $table->string('steamid', 17)->unique();
      $table->integer('opskins_id')->unique();
      $table->string('avatar');
      $table->integer('coins')->unsigned()->default(0);
      $table->boolean('locked?')->default(false);
      $table->boolean('admin?')->default(false);
      // $table->string('used_refferal');
      // $table->string('password');
      // $table->rememberToken();
      $table->timestamps();
      $table->softDeletes();

      $table->boolean('in_trade?')->default(false);
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
