<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  public function up(): void
  {
    Schema::create('grades', function (Blueprint $table) {
      $table->id();

      $table->foreignId('teacher_id')
        ->nullable()
        ->constrained('users')
        ->nullOnDelete();

      $table->unsignedTinyInteger('level');
      $table->string('group');

      $table->timestamps();
      $table->softDeletes();
    });
  }

  public function down(): void
  {
    Schema::dropIfExists('grades');
  }
};
