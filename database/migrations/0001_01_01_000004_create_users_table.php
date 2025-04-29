<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('users', function (Blueprint $table) {
      $table->id();

      $table->foreignId('nationality_id')
        ->nullable()
        ->constrained('nationalities')
        ->nullOnDelete();

      $table->string('name');
      $table->string('surname');
      $table->string('patronymic')->nullable();
      $table->string('login')->unique();
      $table->string('password');
      $table->enum('role', ['superadmin', 'admin', 'director', 'teacher', 'parent', 'student']);
      $table->enum('sex', ['male', 'female']);
      $table->date('birth_date')->nullable();
      $table->string('email')->nullable();
      $table->json('address')->nullable();
      $table->json('phone_numbers')->nullable();
      $table->json('whatsapp')->nullable();
      $table->json('social_link')->nullable();
      $table->string('avatar')->nullable();
      $table->string('avatar_thumb')->nullable();
      $table->timestamp('blocked_at')->nullable();
      $table->timestamp('email_verified_at')->nullable();

      $table->rememberToken();
      $table->timestamps();
      $table->softDeletes();
    });

    Schema::create('password_reset_tokens', function (Blueprint $table) {
      $table->string('email')->primary();
      $table->string('token');
      $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
    });

    Schema::create('sessions', function (Blueprint $table) {
      $table->string('id')->primary();
      $table->foreignId('user_id')->nullable()->index();
      $table->string('ip_address', 45)->nullable();
      $table->text('user_agent')->nullable();
      $table->longText('payload');
      $table->integer('last_activity')->index();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('users');
    Schema::dropIfExists('password_reset_tokens');
    Schema::dropIfExists('sessions');
  }
};
