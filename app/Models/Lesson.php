<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Lesson extends Model
{
  protected $guarded = ['id'];

  protected function casts(): array
  {
    return [
      'hour' => 'integer',
    ];
  }

  public function marks(): HasMany
  {
    return $this->hasMany(Mark::class);
  }

  public function scopeSelectBasic($query)
  {
    return $query->select(
      'id',
      'date',
      'hour',
      'grade_id',
      'subject_id',
      'teacher_id',
      'topic',
      'homework',
    );
  }

  public function toArray()
  {
    $array = array_filter(parent::toArray(), fn($value) => $value);

    $map = [
      'grade_id' => 'gradeId',
      'subject_id' => 'subjectId',
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
