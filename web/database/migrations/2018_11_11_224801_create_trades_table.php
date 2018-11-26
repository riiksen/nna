<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTradesTable extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    Schema::create('trades', function(Blueprint $table) {
      $table->unsignedInteger('id');
      $table->integer('bot_id');
      $table->tinyInteger('state');
      $table->string('steamid', 17);
      $table->unsignedInteger('value');
      $table->string('secretcode', 12);
      $table->string('type');
      $table->timestamps();

      $table->primary('id');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    Schema::drop('trades');
  }
}
