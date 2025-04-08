<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
  public function run(): void
  {
    $this->call([
      GradeSeeder::class,
      NationalitySeeder::class,
      ProfessionSeeder::class,
      UserSeeder::class,
      SubjectSeeder::class,
      LessonSeeder::class,
      RegisterLinkSeeder::class,
    ]);
  }
}
