<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('lessons', function (Blueprint $table) {
      $table->id();

      $table->foreignId('grade_id')
        ->constrained('grades')
        ->cascadeOnDelete();

      $table->foreignId('subject_id')
        ->constrained('subjects')
        ->cascadeOnDelete();

      $table->foreignId('teacher_id')
        ->nullable()
        ->constrained('users')
        ->nullOnDelete();

      $table->foreignId('type_id')
        ->nullable()
        ->constrained('lesson_types')
        ->nullOnDelete();

      $table->date('date');
      $table->enum('hour', [1, 2, 3, 4, 5, 6, 7, 8]);
      $table->string('topic')->nullable();
      $table->string('homework')->nullable();

      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('lessons');
  }
};
