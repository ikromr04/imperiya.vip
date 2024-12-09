<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Grade extends Model
{
  public function students(): HasMany
  {
    return $this->hasMany(User::class, 'grade_id');
  }
}
