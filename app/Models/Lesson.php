<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
  protected $guarded = ['id'];

  public function scopeSelectBasic($query)
  {
    return $query->select(
      'id',
      'name',
    );
  }

  public function toArray()
  {
    $array = parent::toArray();
    return array_filter($array, fn($value) => $value);
  }
}
