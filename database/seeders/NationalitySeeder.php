<?php

namespace Database\Seeders;

use App\Models\Nationality;
use Illuminate\Database\Seeder;

class NationalitySeeder extends Seeder
{
  public function run(): void
  {
    $nationalities = ['Таджик', 'Узбек', 'Русский'];

    foreach ($nationalities as $nationality) {
      Nationality::create([
        'name' => $nationality,
      ]);
    }
  }
}
