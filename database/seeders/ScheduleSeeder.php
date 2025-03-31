<?php

namespace Database\Seeders;

use App\Models\Schedule;
use App\Models\Teacher;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class ScheduleSeeder extends Seeder
{
  public function run(): void
  {
    $faker = Faker::create();

    $startDate = Carbon::today();
    $endDate = Carbon::create(null, 5, 31);

    $dates = [];
    while ($startDate <= $endDate) {
      $dates[] = $startDate->format('Y-m-d');
      $startDate->addDay();
    }

    $schedules = [];
    $teachers = Teacher::all()->map(fn($teacher) => $teacher->user_id);
    foreach ($dates as $date) {
      if (Carbon::parse($date)->dayOfWeek !== Carbon::SUNDAY) {
        foreach (range(1, 7) as $hour) {
          foreach (range(1, 16) as $gradeId) {
            $schedules[] = [
              'date' => $date,
              'hour' => $hour,
              'grade_id' => $gradeId,
              'lesson_id' => $faker->numberBetween(1, 47),
              'teacher_id' => $faker->randomElement($teachers),
              'created_at' => now(),
              'updated_at' => now(),
            ];
          }
        }
      }
    }

    Schedule::insert($schedules);
  }
}
