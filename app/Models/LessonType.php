<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class LessonType extends Model
{
  use SoftDeletes;

  protected $guarded = ['id'];

  public function lessons(): HasMany
  {
    return $this->hasMany(Lesson::class);
  }

  public function scopeSelectBasic($query)
  {
    return $query->select(
      'id',
      'name',
    );
  }
}
