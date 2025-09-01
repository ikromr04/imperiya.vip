<?php

namespace App\Models;

use App\Helpers\Helper;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;

class Mark extends Model
{
  protected $guarded = ['id'];

  public function lesson(): BelongsTo
  {
    return $this->belongsTo(Lesson::class);
  }

  public function scopeSelectBasic($query)
  {
    return $query->select(
      'id',
      'score_1',
      'score_2',
      'attendance',
      'student_id',
      'lesson_id',
      'comment'
    );
  }

  public function toArray()
  {
    $array = array_filter(parent::toArray(), fn($value) => $value);

    $map = [
      'score_1' => 'score1',
      'score_2' => 'score2',
      'student_id' => 'studentId',
      'lesson_id' => 'lessonId',
    ];

    foreach ($map as $snake => $camel) {
      if (isset($array[$snake])) {
        $array[$camel] = $array[$snake];
        unset($array[$snake]);
      }
    }

    return $array;
  }

  protected static function booted()
  {
    static::addGlobalScope('active', function (Builder $builder) {
      $builder->whereBetween('created_at', Helper::getCurrentEducationPeriod());
    });
  }
}
