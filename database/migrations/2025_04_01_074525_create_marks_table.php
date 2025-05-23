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
    Schema::create('marks', function (Blueprint $table) {
      $table->id();

      $table->foreignId('student_id')
        ->constrained('users')
        ->cascadeOnDelete();

      $table->foreignId('lesson_id')
        ->constrained('lessons')
        ->cascadeOnDelete();

      $table->unsignedTinyInteger('score_1')->nullable();
      $table->unsignedTinyInteger('score_2')->nullable();
      $table->enum('attendance', ['P', 'L', 'A', 'EA', 'SUS']);
      $table->text('comment')->nullable();

      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('marks');
  }
};
