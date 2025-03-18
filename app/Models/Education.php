<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Education extends Model
{
  use HasFactory, SoftDeletes;

  protected $guarded = ['id'];
  protected $hidden = [
    'teacher_id',
    'guardian_id',
  ];

  public function teacher(): BelongsTo
  {
    return $this->belongsTo(Teacher::class);
  }

  public function parent(): BelongsTo
  {
    return $this->belongsTo(Guardian::class);
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
      'institution',
      'faculty',
      'speciality',
      'form',
      'started_at as startedAt',
      'graduated_at as graduatedAt',
      'teacher_id',
      'guardian_id',
    );
  }
}
