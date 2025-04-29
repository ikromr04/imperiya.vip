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
    Schema::create('students', function (Blueprint $table) {
      $table->id();

      $table->foreignId('user_id')
        ->constrained('users')
        ->cascadeOnDelete();

      $table->foreignId('grade_id')
        ->nullable()
        ->constrained('grades')
        ->nullOnDelete();

      $table->foreignId('mother_id')
        ->nullable()
        ->constrained('users')
        ->nullOnDelete();

      $table->foreignId('father_id')
        ->nullable()
        ->constrained('users')
        ->nullOnDelete();

      $table->date('admission_date');
      $table->text('previous_schools');
      $table->text('medical_recommendations');

      $table->timestamps();
      $table->softDeletes();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('students');
  }
};
