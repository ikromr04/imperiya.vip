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
    $array = array_filter(parent::toArray(), fn($value) => $value);

    $map = [
      'grade_id' => 'gradeId',
      'mother_id' => 'motherId',
      'father_id' => 'fatherId',
      'admission_date' => 'admissionDate',
      'previous_schools' => 'previousSchools',
      'medical_recommendations' => 'medicalRecommendations',
      'created_at' => 'createdAt',
      'updated_at' => 'updatedAt',
      'deleted_at' => 'deletedAt',
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
