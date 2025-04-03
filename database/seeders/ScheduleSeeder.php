<?php

namespace Database\Seeders;

use App\Models\Evaluation;
use App\Models\Schedule;
use App\Models\Student;
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

    $dates = ['2024-09-02', '2024-09-03', '2024-09-04', '2024-09-05', '2024-09-06', '2024-09-07'];

    $teachers = Teacher::all()->map(fn($teacher) => $teacher->user_id);

    foreach ($dates as $date) {
      foreach (range(1, 7) as $hour) {
        foreach (range(1, 16) as $gradeId) {
          $startDate = Carbon::parse($date);
          $endDate = Carbon::create(null, 5, 31);

          $lessonId = $faker->numberBetween(1, 47);
          $teacherId = $faker->randomElement($teachers);

          while ($startDate->lessThanOrEqualTo($endDate)) {
            $schedule = Schedule::create([
              'date' => $startDate->toDateString(),
              'hour' => $hour,
              'grade_id' => $gradeId,
              'lesson_id' => $lessonId,
              'teacher_id' => $teacherId,
            ]);

            if ($startDate->lessThanOrEqualTo(Carbon::today())) {
              $students = Student::where('grade_id', $gradeId)->get();

              foreach ($students as $student) {
                Evaluation::create([
                  'value' => $faker->randomElement(['н', 'у/п', '2', '3', '4', '5']),
                  'user_id' => $student->user_id,
                  'schedule_id' => $schedule->id,
                ]);
              }
            }

            $startDate->addWeek();
          }
        }
      }
    }
  }
}
