<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Grade extends Model
{
  use SoftDeletes;

  protected $guarded = ['id'];

  public function students(): HasMany
  {
    return $this->hasMany(Student::class);
  }

  public function scopeSelectBasic($query)
  {
    return $query->select(
      'id',
      'level',
      'group',
      'teacher_id',
    );
  }

  public function toArray()
  {
    $array = array_filter(parent::toArray(), fn($value) => $value);

    $map = [
      'teacher_id' => 'teacherId',
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
