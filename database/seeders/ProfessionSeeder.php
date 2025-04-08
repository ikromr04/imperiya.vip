<?php

namespace Database\Seeders;

use App\Models\Profession;
use Illuminate\Database\Seeder;

class ProfessionSeeder extends Seeder
{
  public function run(): void
  {
    $professions = [
      'Образование',
      'Медицина и фармацевтика',
      'Культура',
      'Государственные органы власти',
      'Бизнес',
      'Торговля',
      'Транспорт',
      'Финансы',
      'Красота и здоровье',
      'Спорт',
      'Строительство',
      'Фермерство',
      'Международная организация',
      'Блогер',
      'Дизайн',
      'IT',
      'Временно не работает',
    ];

    foreach ($professions as $profession) {
      Profession::create([
        'name' => $profession,
      ]);
    }
  }
}
