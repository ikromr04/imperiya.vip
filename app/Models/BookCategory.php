<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BookCategory extends Model
{
  protected $guarded = ['id'];

  public function scopeSelectBasic($query)
  {
    return $query->select(
      'id',
      'title',
    );
  }
}
