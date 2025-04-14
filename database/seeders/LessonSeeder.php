<?php

namespace Database\Seeders;

use App\Models\Lesson;
use App\Models\Mark;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class LessonSeeder extends Seeder
{
  public function run(): void
  {
    $faker = Faker::create();

    $startDate = Carbon::today();
    $endDate = Carbon::create(null, 5, 31);

    $dates = ['2024-09-02', '2024-09-03', '2024-09-04', '2024-09-05', '2024-09-06', '2024-09-07'];

    $teachers = User::where('role', 'teacher')->get()->map(fn($user) => $user->id);

    foreach ($dates as $date) {
      foreach (range(1, 7) as $hour) {
        foreach (range(1, 16) as $gradeId) {
          $startDate = Carbon::parse($date);
          $endDate = Carbon::create(null, 5, 31);

          $subjectId = $faker->numberBetween(1, 47);
          $teacherId = $faker->randomElement($teachers);

          while ($startDate->lessThanOrEqualTo($endDate)) {
            $lesson = Lesson::create([
              'date' => $startDate->toDateString(),
              'hour' => $hour,
              'grade_id' => $gradeId,
              'subject_id' => $subjectId,
              'teacher_id' => $teacherId,
              'topic' => $faker->text($faker->numberBetween(10, 20)),
              'homework' => $faker->text($faker->numberBetween(10, 20)),
            ]);

            if ($startDate->lessThanOrEqualTo(Carbon::today())) {
              $students = Student::where('grade_id', $gradeId)->get();

              foreach ($students as $student) {
                Mark::create([
                  'score_1' => $faker->randomElement([2, 3, 4, 5]),
                  'attendance' => $faker->randomElement([true, true, true, true, false, true, false, true, null]),
                  'student_id' => $student->user_id,
                  'lesson_id' => $lesson->id,
                  'comment' => $faker->text($faker->numberBetween(40, 100)),
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
