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
    Schema::create('teachers', function (Blueprint $table) {
      $table->id();

      $table->foreignId('user_id')
        ->constrained('users')
        ->cascadeOnDelete();

      $table->text('education')->nullable();
      $table->text('achievements')->nullable();
      $table->text('work_experience')->nullable();

      $table->timestamps();
      $table->softDeletes();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('teachers');
  }
};
