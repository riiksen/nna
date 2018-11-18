<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePermissionRoleTable extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    Schema::create('permission_role', function (Blueprint $table) {
      $table->increments('id');
      $table->integer('permission_id')->unsigned();
      $table->integer('role_id')->unsigned();

      $table->timestamps();

      $table->foreign('permission_id')->references('id')->on('permissions')->onUpdate('RESTRICT')->onDelete('CASCADE');
      $table->foreign('role_id')->references('id')->on('roles')->onUpdate('RESTRICT')->onDelete('CASCADE');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    Schema::dropIfExists('permission_role');
  }
}
