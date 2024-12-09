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
      $table->string('name');
      $table->string('surname')->nullable();
      $table->string('patronymic')->nullable();
      $table->string('login')->unique();
      $table->string('email')->unique()->nullable();
      $table->string('password');
      $table->string('avatar')->nullable();
      $table->string('avatar_thumb')->nullable();
      $table->date('birth_date')->nullable();
      $table->string('address')->nullable();
      $table->string('facebook')->nullable();
      $table->string('instagram')->nullable();
      $table->string('telegram')->nullable();
      $table->string('odnoklassniki')->nullable();
      $table->integer('role_id');
      $table->integer('gender_id')->nullable();
      $table->integer('grade_id')->nullable();
      $table->integer('nationality_id')->nullable();
      $table->timestamp('email_verified_at')->nullable();
      $table->rememberToken();
      $table->timestamps();
      $table->softDeletes();
    });

    Schema::create('password_reset_tokens', function (Blueprint $table) {
      $table->string('email')->primary();
      $table->string('token');
      $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));;
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

    Schema::table('users', function (Blueprint $table) {
      $table->dropSoftDeletes();
    });
  }
};
