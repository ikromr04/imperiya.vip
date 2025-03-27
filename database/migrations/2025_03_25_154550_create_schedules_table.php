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
    Schema::create('schedules', function (Blueprint $table) {
      $table->id();
      $table->date('date');
      $table->enum('hour', [1, 2, 3, 4, 5, 6, 7, 8]);
      $table->foreignId('grade_id')->constrained('grades')->onDelete('cascade');
      $table->string('topic')->nullable();
      $table->string('homework')->nullable();
      $table->foreignId('lesson_id')->nullable()->constrained('lessons')->onDelete('set null');
      $table->foreignId('teacher_id')->nullable()->constrained('users')->onDelete('set null');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('schedules');
  }
};
