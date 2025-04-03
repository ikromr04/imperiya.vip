<?php

namespace App\Http\Controllers;

use App\Models\Evaluation;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Carbon\Carbon;

class ScheduleController extends Controller
{
  public function index(Request $request): JsonResponse
  {
    $schedules = Schedule::selectBasic()
      ->whereIn('date', $this->getCurrentWeekDates($request->query('week', 0)))
      ->get();

    return response()->json($schedules, 200);
  }

  public function store(Request $request): JsonResponse
  {
    if ($request->has('all') && $request->all) {
      $startDate = Carbon::parse($request->date);
      $endOfMay = Carbon::now()->setMonth(5)->endOfMonth();

      if ($startDate->greaterThan($endOfMay)) {
        $endOfMay = Carbon::create($startDate->year + 1, 5, 31);
      }

      $dates = [];

      while ($startDate->lessThanOrEqualTo($endOfMay)) {
        $dates[] = [
          'date' => $startDate->toDateString(),
          'hour' => $request->hour,
          'grade_id' => $request->grade_id,
          'lesson_id' => $request->lesson_id ?? null,
          'teacher_id' => $request->teacher_id ?? null,
          'created_at' => now(),
          'updated_at' => now()
        ];
        $startDate->addWeek();
      }

      Schedule::insert($dates);

      $schedules = Schedule::selectBasic()
        ->whereIn('date', $this->getCurrentWeekDates($request->query('week', 0)))
        ->get();

      return response()->json($schedules, 201);
    }

    Schedule::create($request->only([
      'date',
      'hour',
      'grade_id',
      'lesson_id',
      'teacher_id',
    ]));

    $schedules = Schedule::selectBasic()
      ->whereIn('date', $this->getCurrentWeekDates($request->query('week', 0)))
      ->get();

    return response()->json($schedules, 201);
  }

  public function update(Request $request): JsonResponse
  {
    $schedule = Schedule::findOrFail($request->id);

    if ($request->has('all') && $request->all) {
      $startDate = Carbon::parse($request->date);
      $endOfMay = Carbon::now()->setMonth(5)->endOfMonth();

      if ($startDate->greaterThan($endOfMay)) {
        $endOfMay = Carbon::create($startDate->year + 1, 5, 31);
      }

      $dates = [];
      while ($startDate->lessThanOrEqualTo($endOfMay)) {
        $dates[] = $startDate->toDateString();
        $startDate->addWeek();
      }

      Schedule::whereIn('date', $dates)
        ->where('hour', $schedule->hour)
        ->where('grade_id', $schedule->grade_id)
        ->update($request->only(['lesson_id', 'teacher_id']));

      $weekDates = $this->getCurrentWeekDates($request->query('week', 0));

      $schedules = Schedule::selectBasic()
        ->whereIn('date', $weekDates)
        ->get();

      return response()->json($schedules, 200);
    }

    $schedule->update($request->only([
      'date',
      'hour',
      'grade_id',
      'lesson_id',
      'teacher_id',
      'topic',
      'homework',
    ]));

    $weekDates = $this->getCurrentWeekDates($request->query('week', 0));

    $schedules = Schedule::selectBasic()
      ->whereIn('date', $weekDates)
      ->get();

    return response()->json($schedules, 200);
  }

  public function delete(Request $request)
  {
    $schedule = Schedule::findOrFail($request->id);

    if ($request->has('all') && $request->all) {
      $startDate = Carbon::parse($request->date);
      $endOfMay = Carbon::now()->setMonth(5)->endOfMonth();

      if ($startDate->greaterThan($endOfMay)) {
        $endOfMay = Carbon::create($startDate->year + 1, 5, 31);
      }

      $dates = [];
      while ($startDate->lessThanOrEqualTo($endOfMay)) {
        $dates[] = $startDate->toDateString();
        $startDate->addWeek();
      }

      Schedule::whereIn('date', $dates)
        ->where('hour', $schedule->hour)
        ->where('grade_id', $schedule->grade_id)
        ->delete();

      $weekDates = $this->getCurrentWeekDates($request->query('week', 0));

      $schedules = Schedule::selectBasic()
        ->whereIn('date', $weekDates)
        ->get();

      return response()->json($schedules, 200);
    }

    $schedule->delete();

    $weekDates = $this->getCurrentWeekDates($request->query('week', 0));

    $schedules = Schedule::selectBasic()
      ->whereIn('date', $weekDates)
      ->get();

    return response()->json($schedules, 200);
  }

  public function journal(Request $request)
  {
    $schedules = Schedule::selectBasic()
      ->orderBy('date')
      ->where('lesson_id', $request->lesson)
      ->where('grade_id', $request->grade)
      ->with([
        'evaluations' => fn($query) => $query->select(
          'id',
          'value',
          'user_id',
          'schedule_id',
        ),
      ])
      ->get();

    return response()->json($schedules, 200);
  }

  public function storeEvaluation(Request $request)
  {
    $evaluation = Evaluation::create($request->only([
      'value',
      'user_id',
      'schedule_id',
    ]));

    return response()->json($evaluation, 201);
  }

  public function updateEvaluation(Request $request)
  {
    $evaluation = Evaluation::findOrFail($request->id)
      ->update($request->only(['value']));

    return response()->json($evaluation, 201);
  }

  public static function getCurrentWeekDates(int $week)
  {
    $startOfWeek = Carbon::now()->startOfWeek();

    return collect(range(0, 5))->map(function ($i) use ($startOfWeek, $week) {
      return $startOfWeek->copy()->addDays($i + ($week * 7))->toDateString();
    })->toArray();
  }
}
