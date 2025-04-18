<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Str;
use Spatie\Sluggable\SlugOptions;
use Spatie\Sluggable\HasSlug;

class User extends Authenticatable
{
  use HasApiTokens;
  use Notifiable;
  use SoftDeletes;
  use HasSlug;

  protected $guarded = ['id'];

  protected function casts(): array
  {
    return [
      'email_verified_at' => 'datetime',
      'socialLink' => 'array',
      'phoneNumbers' => 'array',
      'address' => 'array',
      'whatsapp' => 'array',
      'social_link' => 'array',
      'phone_numbers' => 'array',
    ];
  }

  protected static function boot()
  {
    parent::boot();

    static::creating(function ($user) {
      if (empty($user->password)) {
        $user->password = Crypt::encryptString(Str::random(8));
      }
    });
  }

  public function getSlugOptions(): SlugOptions
  {
    return SlugOptions::create()
      ->generateSlugsFrom('name')
      ->saveSlugsTo('login')
      ->doNotGenerateSlugsOnUpdate();
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

  public function scopeSelectBasic($query)
  {
    return $query->select(
      'id',
      'name',
      'surname',
      'patronymic',
      'login',
      'password',
      'role',
      'sex',
      'email',
      'avatar',
      'avatar_thumb',
      'birth_date',
      'address',
      'whatsapp',
      'nationality_id',
      'social_link',
      'phone_numbers',
      'blocked_at',
      'updated_at',
      'created_at',
    )->with([
      'superadmin' => fn($query) => $query->selectBasic(),
      'admin' => fn($query) => $query->selectBasic(),
      'director' => fn($query) => $query->selectBasic(),
      'teacher' => fn($query) => $query->selectBasic(),
      'student' => fn($query) => $query->selectBasic(),
      'parent' => fn($query) => $query->selectBasic(),
    ]);
  }

  public function scopeSelectForStudents($query)
  {
    return $query->where('role', 'teacher')
      ->select(
        'id',
        'name',
        'surname',
        'patronymic',
        'role',
        'sex',
        'email',
        'avatar',
        'avatar_thumb',
        'birth_date',
        'address',
        'whatsapp',
        'nationality_id',
        'social_link',
        'phone_numbers',
      )->with([
        'teacher' => fn($query) => $query->selectBasic(),
      ]);
  }

  public function scopeSelectForTeachers($query)
  {
    return $query->whereIn('role', ['student', 'parent', 'teacher'])
      ->select(
        'id',
        'name',
        'surname',
        'patronymic',
        'role',
        'sex',
        'email',
        'avatar',
        'avatar_thumb',
        'birth_date',
        'address',
        'whatsapp',
        'nationality_id',
        'social_link',
        'phone_numbers',
      )->with([
        'student' => fn($query) => $query->selectBasic(),
      ]);
  }

  public function toArray()
  {
    $array = array_filter(parent::toArray(), fn($value) => $value);

    $map = [
      'avatar_thumb' => 'avatarThumb',
      'birth_date' => 'birthDate',
      'nationality_id' => 'nationalityId',
      'social_link' => 'socialLink',
      'phone_numbers' => 'phoneNumbers',
      'blocked_at' => 'blockedAt',
      'updated_at' => 'updatedAt',
      'created_at' => 'createdAt',
    ];

    foreach ($map as $snake => $camel) {
      if (isset($array[$snake])) {
        $array[$camel] = $array[$snake];
        unset($array[$snake]);
      }
    }

    if (!empty($array['password'])) {
      $array['password'] = Crypt::decryptString($array['password']);
    }

    if (!empty($array['address'])) {
      $array['address'] = [
        'physicalAddress' => $array['address']['physical_address'],
        'region' => $array['address']['region'],
      ];
    }

    return $array;
  }
}
