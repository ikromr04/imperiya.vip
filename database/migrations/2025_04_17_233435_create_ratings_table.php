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
    Schema::create('ratings', function (Blueprint $table) {
      $table->id();
      $table->string('years');
      $table->enum('rating', [
        'quarter1',
        'quarter2',
        'semester1',
        'quarter3',
        'quarter4',
        'semester2',
        'annual',
        'assessment',
        'final',
      ]);
      $table->tinyInteger('score')->unsigned()->nullable();
      $table->foreignId('student_id')->constrained('users')->cascadeOnDelete();
      $table->foreignId('grade_id')->constrained('grades')->cascadeOnDelete();
      $table->foreignId('subject_id')->constrained('subjects')->cascadeOnDelete();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('ratings');
  }
};
