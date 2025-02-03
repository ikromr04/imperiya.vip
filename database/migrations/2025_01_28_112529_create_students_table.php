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
      $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
      $table->foreignId('grade_id')->nullable()->constrained('grades')->onDelete('SET NULL');
      $table->foreignId('mother_id')->nullable()->constrained('users')->onDelete('SET NULL');
      $table->foreignId('father_id')->nullable()->constrained('users')->onDelete('SET NULL');
      $table->timestamps();
      $table->softDeletes();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::table('students', function (Blueprint $table) {
      $table->dropSoftDeletes();
    });
  }
};
