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
    Schema::create('education', function (Blueprint $table) {
      $table->id();
      $table->string('institution');
      $table->string('faculty');
      $table->string('speciality');
      $table->string('form');
      $table->timestamp('started_at');
      $table->timestamp('graduated_at');
      $table->foreignId('teacher_id')->nullable()->constrained('teachers')->onDelete('cascade');
      $table->foreignId('parent_id')->nullable()->constrained('teachers')->onDelete('cascade');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('education');
  }
};
