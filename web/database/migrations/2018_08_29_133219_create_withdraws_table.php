<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWithdrawsTable extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    Schema::create('withdraws', function (Blueprint $table) {
      $table->increments('id');
      $table->unsignedInteger('user_id');

      $table->timestamps();
      $table->softDeletes();
      
      $table->foreign('user_id')->references('id')->on('users');
      //                           ->onDelete('restrict')
      //                           ->onUpdate('restrict');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    Schema::dropIfExists('withdraws');
  }
}
