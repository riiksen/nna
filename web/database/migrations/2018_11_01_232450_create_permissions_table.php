<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePermissionsTable extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    Schema::create('permissions', function (Blueprint $table) {
      $table->increments('id');
      $table->string('name')->unique();
      $table->string('display_name');
      // $table->integer('created_by')->unsigned();
      // $table->integer('updated_by')->unsigned()->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    Schema::dropIfExists('permissions');
  }
}
