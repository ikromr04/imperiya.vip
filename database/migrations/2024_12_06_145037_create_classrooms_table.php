<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  public function up(): void
  {
    Schema::create('classrooms', function (Blueprint $table) {
      $table->id();
      $table->integer('level');
      $table->string('group');
      $table->timestamps();
    });
  }

  public function down(): void
  {
    Schema::dropIfExists('classrooms');
  }
};