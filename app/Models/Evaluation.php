<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Evaluation extends Model
{
  protected $guarded = ['id'];

  public function schedule(): BelongsTo
  {
    return $this->belongsTo(Schedule::class);
  }
}
