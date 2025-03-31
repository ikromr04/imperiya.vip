<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Carbon\Carbon;

class ScheduleController extends Controller
{
  public function index(Request $request): JsonResponse
  {
    $schedules = Schedule::selectBasic()
      ->whereIn('date', $this->getCurrentWeekDates($request))
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
        ->whereIn('date', $this->getCurrentWeekDates($request))
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
      ->whereIn('date', $this->getCurrentWeekDates($request))
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

      $weekDates = $this->getCurrentWeekDates($request);

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

    $weekDates = $this->getCurrentWeekDates($request);

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

      $weekDates = $this->getCurrentWeekDates($request);

      $schedules = Schedule::selectBasic()
        ->whereIn('date', $weekDates)
        ->get();

      return response()->json($schedules, 200);
    }

    $schedule->delete();

    $weekDates = $this->getCurrentWeekDates($request);

    $schedules = Schedule::selectBasic()
      ->whereIn('date', $weekDates)
      ->get();

    return response()->json($schedules, 200);
  }

  public function getCurrentWeekDates(Request $request)
  {
    $currentWeek = $request->query('week', 0);
    $startOfWeek = Carbon::now()->startOfWeek();

    return collect(range(0, 5))->map(function ($i) use ($startOfWeek, $currentWeek) {
      return $startOfWeek->copy()->addDays($i + ($currentWeek * 7))->toDateString();
    })->toArray();
  }
}
