<?php

namespace App\Models;

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

  protected $guarded = [];

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

  public function grade(): BelongsTo
  {
    return $this->belongsTo(Grade::class, 'grade_id');
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
