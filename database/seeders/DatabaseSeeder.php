<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
  public function run(): void
  {
    $this->call([
      NationalitySeeder::class,
      ProfessionSeeder::class,
      GradeSeeder::class,
      UserSeeder::class,
      SubjectSeeder::class,
      RatingDateSeeder::class,
      LessonSeeder::class,
    ]);
  }
}
