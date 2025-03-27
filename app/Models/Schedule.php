<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
  protected $guarded = ['id'];

  public function scopeSelectBasic($query)
  {
    return $query->select(
      'id',
      'date',
      'hour',
      'topic',
      'homework',
      'lesson_id as lessonId',
      'grade_id as gradeId',
      'teacher_id as teacherId',
    );
  }

  public function toArray()
  {
    $array = parent::toArray();
    return array_filter($array, fn($value) => $value);
  }
}
