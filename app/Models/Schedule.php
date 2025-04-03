<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Schedule extends Model
{
  protected $guarded = ['id'];

  protected function casts(): array
  {
    return [
      'hour' => 'integer',
    ];
  }

  public function evaluations(): HasMany
  {
    return $this->hasMany(Evaluation::class);
  }

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
