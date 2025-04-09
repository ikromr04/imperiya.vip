<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Guardian extends Model
{
  use SoftDeletes;

  protected $guarded = ['id'];
  protected $hidden = [
    'id',
    'user_id',
  ];
  protected $appends = ['children'];

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }

  public function scopeSelectBasic($query)
  {
    return $query->select(
      'id',
      'user_id',
      'profession_id as professionId',
      'workplace',
      'position',
    );
  }

  public function getChildrenAttribute()
  {
    return Student::where('mother_id', $this->user_id)
      ->orWhere('father_id', $this->user_id)
      ->pluck('user_id')
      ->toArray();
  }

  public function toArray()
  {
    $array = parent::toArray();
    return array_filter($array, fn($value) => $value);
  }
}
