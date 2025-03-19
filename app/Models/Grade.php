<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Grade extends Model
{
  use HasFactory;

  protected $guarded = ['id'];

  public function students(): HasMany
  {
    return $this->hasMany(Student::class);
  }

  public function scopeSelectBasic($query)
  {
    return $query->select(
      'id',
      'level',
      'group',
    );
  }
}
