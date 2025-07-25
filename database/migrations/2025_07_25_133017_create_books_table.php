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
    Schema::create('books', function (Blueprint $table) {
      $table->id();

      $table->foreignId('book_category_id')
        ->nullable()
        ->constrained('book_categories')
        ->nullOnDelete();

      $table->string('title');
      $table->enum('access', ['all', 'students', 'parents', 'teachers']);
      $table->string('lang');
      $table->string('link');
      $table->text('description')->nullable();

      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('books');
  }
};
