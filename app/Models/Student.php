<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Student extends Model
{
  use HasFactory;

  protected $guarded = ['id'];
  protected $hidden = [
    'user_id',
    'grade_id',
    'mother_id',
    'father_id',
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
      'grade_id',
      'mother_id',
      'father_id',
    )->with([
      'grade' => fn($query) => $query->selectBasic(),
      'mother' => fn($query) => $query->select('id', 'name'),
      'father' => fn($query) => $query->select('id', 'name'),
    ]);
  }
}
