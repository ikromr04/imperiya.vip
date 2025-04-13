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
      $table->tinyInteger('score_1')->unsigned()->nullable();
      $table->tinyInteger('score_2')->unsigned()->nullable();
      $table->boolean('attendance')->nullable();
      $table->foreignId('student_id')->constrained('users')->cascadeOnDelete();
      $table->foreignId('lesson_id')->constrained('lessons')->cascadeOnDelete();
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
