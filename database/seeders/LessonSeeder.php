<?php

namespace Database\Seeders;

use App\Models\Lesson;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LessonSeeder extends Seeder
{
  public function run(): void
  {
    $lessons = [
      'Математика',
      'Ментальная арифметика',
      'Азбука',
      'Happy English',
      'Логическое мышление',
      'Государственный язык',
      'Школа ораторского мастерства',
      'Творчество',
    ];

    foreach ($lessons as $lesson) {
      Lesson::create([
        'name' => $lesson,
      ]);
    }
  }
}
