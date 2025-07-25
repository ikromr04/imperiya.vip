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

  protected $casts = [
    'email_verified_at' => 'datetime',
    'address' => 'array',
    'whatsapp' => 'array',
    'social_link' => 'array',
    'phone_numbers' => 'array',
  ];

  protected static function booted(): void
  {
    parent::boot();

    static::creating(function (User $user) {
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

  public function toArray()
  {
    $array = array_filter(parent::toArray(), fn($value) => $value);

    $map = [
      'birth_date' => 'birthDate',
      'nationality_id' => 'nationalityId',
      'reason_id' => 'reasonId',
      'phone_numbers' => 'phoneNumbers',
      'social_link' => 'socialLink',
      'avatar_thumb' => 'avatarThumb',
      'blocked_at' => 'blockedAt',
      'email_verified_at' => 'emailVerifiedAt',
      'remember_token' => 'rememberToken',
      'created_at' => 'createdAt',
      'updated_at' => 'updatedAt',
      'deleted_at' => 'deletedAt',
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
        'physicalAddress' => $array['address']['physical_address'] ?? null,
        'region' => $array['address']['region'] ?? null,
      ];
    }

    return $array;
  }
}
