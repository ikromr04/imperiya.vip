<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Teacher extends Model
{
  use HasFactory, SoftDeletes;

  protected $guarded = ['id'];
  protected $hidden = ['user_id'];

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }

  public function educations(): HasMany
  {
    return $this->hasMany(Education::class);
  }

  public function scopeSelectBasic($query)
  {
    return $query->select(
      'id',
      'user_id',
    )->with([
      'user:id,name',
      'educations' => fn($query) =>$query->selectBasic(),
    ]);
  }
}
