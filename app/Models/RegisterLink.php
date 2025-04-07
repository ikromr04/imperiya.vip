<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RegisterLink extends Model
{
  protected $guarded = ['id'];

  public function scopeSelectBasic($query)
  {
    return $query->select(
      'id',
      'token',
      'expires_at as expiresAt',
    );
  }
}
