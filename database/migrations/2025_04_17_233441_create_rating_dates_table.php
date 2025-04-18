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
    Schema::create('rating_dates', function (Blueprint $table) {
      $table->id();
      $table->string('years');
      $table->date('quarter1')->nullable();
      $table->date('quarter2')->nullable();
      $table->date('semester1')->nullable();
      $table->date('quarter3')->nullable();
      $table->date('quarter4')->nullable();
      $table->date('semester2')->nullable();
      $table->date('annual')->nullable();
      $table->date('assessment')->nullable();
      $table->date('final')->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('rating_dates');
  }
};
