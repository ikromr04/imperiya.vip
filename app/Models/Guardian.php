<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Guardian extends Model
{
  use HasFactory, SoftDeletes;

  protected $guarded = ['id'];
  protected $hidden = ['user_id'];
  protected $appends = ['children'];

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
    ]);
  }

  public function getChildrenAttribute()
  {
    $students = Student::select(
      'id',
      'mother_id',
      'user_id',
      'father_id',
    )->where('mother_id', $this->user_id)
      ->orWhere('father_id', $this->user_id)
      ->with(['user:id,name'])
      ->get();

    $children = [];
    foreach ($students as $student) {
      array_push($children, [
        'id' => $student->user->id,
        'name' => $student->user->name,
      ]);
    }

    return $children;
  }
}
