<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Trades extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create(function(Blueprint $table) {
            $table->unsignedInteger('id');
            $table->integer('bot_id');
            $table->tinyInteger('state');
            $table->string('steamid',17);
            $table->unsignedInteger('value');
            $table->varchar('secretcode',12);
            $table->varchar('type');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('trades');
    }
}
