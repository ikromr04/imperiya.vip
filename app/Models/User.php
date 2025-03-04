<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class User extends Authenticatable
{
  use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

  protected $guarded = ['id'];

  protected $hidden = ['nationality_id'];

  protected function casts(): array
  {
    return [
      'email_verified_at' => 'datetime',
      'password' => 'hashed',
      'socialLink' => 'array',
      'phoneNumbers' => 'array',
      'social_link' => 'array',
      'phone_numbers' => 'array',
    ];
  }

  public function superadmin(): HasOne
  {
    return $this->hasOne(Superadmin::class);
  }

  public function admin(): HasOne
  {
    return $this->hasOne(Admin::class);
  }

  public function director(): HasOne
  {
    return $this->hasOne(Director::class);
  }

  public function teacher(): HasOne
  {
    return $this->hasOne(Teacher::class);
  }

  public function student(): HasOne
  {
    return $this->hasOne(Student::class);
  }

  public function parent(): HasOne
  {
    return $this->hasOne(Guardian::class);
  }

  public function nationality(): BelongsTo
  {
    return $this->belongsTo(Nationality::class, 'nationality_id');
  }

  public function toArray()
  {
    $array = parent::toArray();
    return array_filter($array, fn($value) => $value);
  }

  public function scopeSelectBasic($query)
  {
    return $query->select(
      'id',
      'name',
      'login',
      'role',
      'sex',
      'email',
      'avatar',
      'avatar_thumb as avatarThumb',
      'birth_date as birthDate',
      'address',
      'nationality_id',
      'social_link as socialLink',
      'phone_numbers as phoneNumbers',
      'created_at as createdAt',
    )->with([
      'nationality' => fn($query) => $query->selectBasic(),
      'superadmin' => fn($query) => $query->selectBasic(),
      'admin' => fn($query) => $query->selectBasic(),
      'director' => fn($query) => $query->selectBasic(),
      'teacher' => fn($query) => $query->selectBasic(),
      'student' => fn($query) => $query->selectBasic(),
      'parent' => fn($query) => $query->selectBasic(),
    ]);
  }

  protected static function boot()
  {
    parent::boot();

    static::creating(function ($user) {
      if (empty($user->password)) {
        $user->password = Hash::make(Str::random(8));
      }
    });

    static::deleting(function ($user) {
      $user->admin?->delete();
      $user->director?->delete();
      $user->teacher?->delete();
      $user->parent?->delete();
      $user->student?->delete();
    });
  }
}
