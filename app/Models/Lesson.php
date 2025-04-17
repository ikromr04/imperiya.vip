<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
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

  public function type(): BelongsTo
  {
    return $this->belongsTo(LessonType::class);
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
      'type_id',
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
      'type_id' => 'typeId',
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
