<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Education extends Model
{
  use HasFactory;

  protected $guarded = ['id'];
  protected $hidden = [
    'teacher_id',
    'parent_id',
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
      'parent_id',
    );
  }
}
