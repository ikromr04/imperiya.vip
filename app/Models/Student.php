<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Student extends Model
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

  public function mother(): BelongsTo
  {
    return $this->belongsTo(User::class, 'mother_id');
  }

  public function father(): BelongsTo
  {
    return $this->belongsTo(User::class, 'father_id');
  }

  public function grade(): BelongsTo
  {
    return $this->belongsTo(Grade::class);
  }

  public function toArray()
  {
    $array = parent::toArray();
    return array_filter($array, fn($value) => $value);
  }

  public function scopeSelectBasic($query)
  {
    return $query->select(
      'id',
      'user_id',
      'grade_id as gradeId',
      'mother_id as motherId',
      'father_id as fatherId',
    );
  }
}
