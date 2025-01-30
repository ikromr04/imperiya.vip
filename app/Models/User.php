<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
  use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

  protected $guarded = ['id'];
  protected $appends = ['role'];

  protected $hidden = [
    'password',
    'remember_token',
    'role_id',
    'gender_id',
    'nationality_id',
  ];

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

  public function superAdmin(): HasOne
  {
    return $this->hasOne(SuperAdmin::class);
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

  public function gender(): BelongsTo
  {
    return $this->belongsTo(Gender::class, 'gender_id');
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

  public function getRoleAttribute()
  {
    switch ($this->role_id) {
      case 'super-admin':
        return [
          'id' => 'super-admin',
          'name' => 'Супер-администратор',
          ...($this->superAdmin ? $this->superAdmin->toArray() : []),
        ];
      case 'admin':
        return [
          'id' => 'admin',
          'name' => 'Администратор',
          ...($this->admin ? $this->admin->toArray() : []),
        ];
      case 'director':
        return [
          'id' => 'director',
          'name' => 'Директор',
          ...($this->director ? $this->director->toArray() : []),
        ];
      case 'teacher':
        return [
          'id' => 'teacher',
          'name' => 'Педагог',
          ...($this->teacher ? $this->teacher->toArray() : []),
        ];
      case 'parent':
        return [
          'id' => 'parent',
          'name' => 'Родитель',
          ...($this->parent ? $this->parent->toArray() : []),
        ];
      case 'student':
        return [
          'id' => 'student',
          'name' => 'Ученик',
          ...($this->student ? $this->student->toArray() : []),
        ];
    }
  }

  public function scopeSelectBasic($query)
  {
    return $query->select(
      'id',
      'name',
      'login',
      'role_id',
      'email',
      'avatar',
      'avatar_thumb as avatarThumb',
      'birth_date as birthDate',
      'address',
      'gender_id',
      'nationality_id',
      'social_link as socialLink',
      'phone_numbers as phoneNumbers',
      'created_at as createdAt',
    )->with([
      'gender' => fn($query) => $query->selectBasic(),
      'nationality' => fn($query) => $query->selectBasic(),
      'superAdmin',
      'admin',
      'director',
      'teacher',
      'student',
      'parent',
    ]);
  }
}
