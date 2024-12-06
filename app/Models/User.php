<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
  use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

  protected $fillable = [
    'name',
    'email',
    'password',
  ];

  protected $hidden = [
    'password',
    'remember_token',
  ];

  protected function casts(): array
  {
    return [
      'email_verified_at' => 'datetime',
      'password' => 'hashed',
    ];
  }

  public function gender(): BelongsTo
  {
    return $this->belongsTo(Gender::class, 'gender_id');
  }

  public function phones(): HasMany
  {
    return $this->hasMany(Phone::class, 'user_id');
  }

  public function classroom(): BelongsTo
  {
    return $this->belongsTo(Classroom::class, 'classroom_id');
  }

  public function nationality(): BelongsTo
  {
    return $this->belongsTo(Nationality::class, 'nationality_id');
  }

  public function role(): BelongsTo
  {
    return $this->belongsTo(Role::class, 'role_id');
  }
}
