<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Nationality extends Model
{
  public function users(): HasMany
  {
    return $this->hasMany(User::class, 'nationality_id');
  }

  public function scopeSelectBasic($query)
  {
    return $query->select('id', 'name');
  }
}
