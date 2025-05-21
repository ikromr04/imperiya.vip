<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Teacher extends Model
{
  use SoftDeletes;

  protected $guarded = ['id'];
  protected $hidden = [
    'id',
    'user_id',
  ];

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }

  public function toArray()
  {
    $array = array_filter(parent::toArray(), fn($value) => $value);

    $map = [
      'work_experience' => 'workExperience',
    ];

    foreach ($map as $snake => $camel) {
      if (isset($array[$snake])) {
        $array[$camel] = $array[$snake];
        unset($array[$snake]);
      }
    }

    return $array;
  }
}
