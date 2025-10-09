<?php

namespace App\Http\Controllers;

use App\Http\Requests\LessonTypeStoreRequest;
use App\Http\Requests\LessonTypeUpdateRequest;
use App\Models\Lesson;
use App\Models\LessonType;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Carbon\Carbon;

class LessonController extends Controller
{
  public function index(Request $request): JsonResponse
  {
    $user = $request->user();
    $lessons = [];

    switch ($user->role) {
      case 'superadmin':
        case 'admin':
        if ($request->query('subject_id') && $request->query('grade_id')) {
          $lessons = Lesson::selectBasic()
            ->orderBy('date')
            ->where('subject_id', $request->query('subject_id'))
            ->where('grade_id', $request->query('grade_id'))
            ->get();
        } else if ($request->query('grade_id')) {
          $lessons = Lesson::selectBasic()
            ->whereIn('date', $this->getCurrentWeekDates($request->query('week', 0)))
            ->where('grade_id', $request->query('grade_id'))
            ->get();
        } else if ($request->query('teacher_id')) {
          $lessons = Lesson::selectBasic()
            ->whereIn('date', $this->getCurrentWeekDates($request->query('week', 0)))
            ->where('teacher_id', $request->query('teacher_id'))
            ->get();
        } else {
          $lessons = Lesson::selectBasic()
            ->whereIn('date', $this->getCurrentWeekDates($request->query('week', 0)))
            ->get();
        }
        break;

      case 'teacher':
        if ($request->query('subject_id') && $request->query('grade_id')) {
          $lessons = Lesson::selectBasic()
            ->orderBy('date')
            ->where('subject_id', $request->query('subject_id'))
            ->where('grade_id', $request->query('grade_id'))
            ->get();
        } else {
          $lessons = Lesson::selectBasic()
            ->whereIn('date', $this->getCurrentWeekDates($request->query('week', 0)))
            ->where('teacher_id', $request->query('teacher_id'))
            ->get();
        }
        break;

      case 'parent':
        $lessons = Lesson::selectBasic()
          ->whereIn('date', $this->getCurrentWeekDates($request->query('week', 0)))
          ->where('grade_id', $request->query('grade_id'))
          ->get();
        break;

      case 'student':
        $lessons = Lesson::selectBasic()
          ->whereIn('date', $this->getCurrentWeekDates($request->query('week', 0)))
          ->where('grade_id', $request->query('grade_id'))
          ->get();
        break;
    }

    return response()->json($lessons, 200);
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
          'subject_id' => $request->subject_id ?? null,
          'teacher_id' => $request->teacher_id ?? null,
          'created_at' => now(),
          'updated_at' => now()
        ];
        $startDate->addWeek();
      }

      $justDates = collect($dates)->map(fn($item) => $item['date']);

      Lesson::whereIn('date', $justDates)
        ->where('hour', $request->hour)
        ->where('grade_id', $request->grade_id)
        ->delete();

      Lesson::insert($dates);

      $lessons = Lesson::selectBasic()
        ->whereIn('date', $this->getCurrentWeekDates($request->query('week', 0)))
        ->get();

      return response()->json($lessons, 201);
    }

    Lesson::create($request->only([
      'date',
      'hour',
      'grade_id',
      'subject_id',
      'teacher_id',
    ]));

    $lessons = Lesson::selectBasic()
      ->whereIn('date', $this->getCurrentWeekDates($request->query('week', 0)))
      ->get();

    return response()->json($lessons, 201);
  }

  public function update(Request $request): JsonResponse
  {
    $lesson = Lesson::findOrFail($request->id);

    if ($request->has('all') && $request->all) {
      $startDate = Carbon::parse($lesson->date);
      $endOfMay = Carbon::now()->setMonth(5)->endOfMonth();

      if ($startDate->greaterThan($endOfMay)) {
        $endOfMay = Carbon::create($startDate->year + 1, 5, 31);
      }

      $dates = [];
      while ($startDate->lessThanOrEqualTo($endOfMay)) {
        $dates[] = $startDate->toDateString();
        $startDate->addWeek();
      }

      Lesson::whereIn('date', $dates)
        ->where('hour', $lesson->hour)
        ->where('grade_id', $lesson->grade_id)
        ->update($request->only(['subject_id', 'teacher_id']));

      $weekDates = $this->getCurrentWeekDates($request->query('week', 0));

      $lessons = Lesson::selectBasic()
        ->whereIn('date', $weekDates)
        ->get();

      return response()->json($lessons, 200);
    }

    $lesson->update($request->only([
      'date',
      'hour',
      'grade_id',
      'subject_id',
      'teacher_id',
      'type_id',
      'topic',
      'homework',
    ]));

    $weekDates = $this->getCurrentWeekDates($request->query('week', 0));

    $lessons = Lesson::selectBasic()
      ->whereIn('date', $weekDates)
      ->get();

    return response()->json($lessons, 200);
  }

  public function updateTopic(Request $request): JsonResponse
  {
    $lesson = Lesson::findOrFail($request->id);

    $lesson->update($request->only(['date', 'hour', 'grade_id', 'subject_id', 'teacher_id', 'type_id', 'topic', 'homework']));

    return response()->json(Lesson::selectBasic()->find($request->id), 200);
  }


  public function delete(Request $request)
  {
    $lesson = Lesson::findOrFail($request->id);
    $week = $request->query('week', 0);

    if ($request->query('all') && $request->query('all') === 'true') {
      $startDate = Carbon::parse($lesson->date);
      $endOfMay = Carbon::now()->setMonth(5)->endOfMonth();

      if ($startDate->greaterThan($endOfMay)) {
        $endOfMay = Carbon::create($startDate->year + 1, 5, 31);
      }

      $dates = [];
      while ($startDate->lessThanOrEqualTo($endOfMay)) {
        $dates[] = $startDate->toDateString();
        $startDate->addWeek();
      }

      Lesson::whereIn('date', $dates)
        ->where('hour', $lesson->hour)
        ->where('grade_id', $lesson->grade_id)
        ->delete();

      $weekDates = $this->getCurrentWeekDates($week);

      $lessons = Lesson::selectBasic()
        ->whereIn('date', $weekDates)
        ->get();

      return response()->json($lessons, 200);
    }

    $lesson->delete();

    $weekDates = $this->getCurrentWeekDates($week);

    $lessons = Lesson::selectBasic()
      ->whereIn('date', $weekDates)
      ->get();

    return response()->json($lessons, 200);
  }

  public function journal(Request $request)
  {
    $user = $request->user();

    $lessons = [];

    switch ($user->role) {
      case 'superadmin':
        $lessons = Lesson::selectBasic()
          ->orderBy('date')
          ->where('subject_id', $request->query('subject_id'))
          ->where('grade_id', $request->query('grade_id'))
          ->with([
            'marks' => fn($query) => $query->selectBasic(),
          ])
          ->get();
        break;

      case 'teacher':
        $lessons = Lesson::selectBasic()
          ->orderBy('date')
          ->where('subject_id', $request->query('subject_id'))
          ->where('grade_id', $request->query('grade_id'))
          ->with([
            'marks' => fn($query) => $query->selectBasic(),
          ])
          ->get();
        break;
    }

    return response()->json($lessons, 200);
  }

  public static function getCurrentWeekDates(int $week)
  {
    $startOfWeek = Carbon::now()->startOfWeek();

    return collect(range(0, 5))->map(function ($i) use ($startOfWeek, $week) {
      return $startOfWeek->copy()->addDays($i + ($week * 7))->toDateString();
    })->toArray();
  }

  public function types(): JsonResponse
  {
    $types = LessonType::selectBasic()->orderBy('name')->get();

    return response()->json($types, 200);
  }

  public function storeType(LessonTypeStoreRequest $request): JsonResponse
  {
    $type = LessonType::create($request->only(['name']));

    return response()->json([
      'id' => $type->id,
      'name' => $type->name,
    ], 201);
  }

  public function updateType(LessonTypeUpdateRequest $request, int $id): JsonResponse
  {
    $type = LessonType::findOrFail($id);

    $type->update($request->only('name'));

    return response()->json([
      'id' => $type->id,
      'name' => $type->name,
    ], 200);
  }

  public function deleteType(Request $request)
  {
    LessonType::findOrFail($request->id)->delete();

    return response()->noContent();
  }
}
