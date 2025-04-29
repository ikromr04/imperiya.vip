<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Guardian extends Model
{
  use SoftDeletes;

  protected $guarded = ['id'];

  protected $hidden = [
    'id',
    'user_id',
  ];

  protected $appends = ['children'];

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }

  public function getChildrenAttribute()
  {
    return Student::where('mother_id', $this->user_id)
      ->orWhere('father_id', $this->user_id)
      ->pluck('user_id')
      ->toArray();
  }

  public function toArray()
  {
    $array = array_filter(parent::toArray(), fn($value) => $value);

    $map = [
      'profession_id' => 'professionId',
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
