<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SuperAdmin extends Model
{
  use HasFactory;

  protected $guarded = ['id'];
  protected $hidden = ['user_id'];

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }

  public function scopeSelectBasic($query)
  {
    return $query->select('id', 'user_id');
  }
}
