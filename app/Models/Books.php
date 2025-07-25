<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Books extends Model
{
  protected $guarded = ['id'];

  public function scopeSelectBasic($query)
  {
    return $query->select(
      'id',
      'book_category_id',
      'title',
      'access',
      'lang',
      'link',
      'description',
    );
  }

  public function toArray()
  {
    $array = array_filter(parent::toArray(), fn($value) => $value);

    $map = [
      'book_category_id' => 'bookCategoryId',
    ];

    foreach ($map as $snake => $camel) {
      if (isset($array[$snake])) {
        $array[$camel] = $array[$snake];
        unset($array[$snake]);
      }
    }

    return $array;
  }
}
