<?php

namespace Database\Seeders;

use App\Models\Gender;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GenderSeeder extends Seeder
{
  public function run(): void
  {
    $genders = [
      'Мужской',
      'Женский',
    ];

    foreach ($genders as $gender) {
      Gender::create([
        'name' => $gender,
      ]);
    }
  }
}
