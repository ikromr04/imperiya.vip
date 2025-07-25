<?php

namespace App\Http\Controllers;

use App\Events\MarkEvents;
use App\Events\MarkUpdateEvent;
use App\Http\Requests\MarkStoreRequest;
use App\Http\Requests\MarkUpdateRequest;
use App\Models\Mark;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class MarkController extends Controller
{
  public function index(Request $request): JsonResponse
  {
    $user = $request->user();
    $marks = [];

    switch ($user->role) {
      case 'superadmin':
        $marks = Mark::whereIn('lesson_id', json_decode($request->query('lessons')))
          ->get();
        break;

      case 'teacher':
        $marks = Mark::whereIn('lesson_id', json_decode($request->query('lessons')))
          ->get();
        break;

      case 'parent':
        $marks = Mark::whereIn('lesson_id', json_decode($request->query('lessons')))
          ->get();
        break;

      case 'student':
        $marks = Mark::whereIn('lesson_id', json_decode($request->query('lessons')))
          ->get();
        break;
    }

    return response()->json($marks, 200);
  }

  public function diary(Request $request): JsonResponse
  {
    $user = $request->user();
    $marks = [];

    switch ($user->role) {
      case 'parent':
        $student = Student::where('user_id', $request->studentId)->first();

        if ($student->father_id === $user->id || $student->mother_id === $user->id) {
          $marks = Mark::where('student_id', $request->studentId)
            ->whereIn('lesson_id', $request->lessons)
            ->get();
        }
        break;

      case 'student':
        $marks = Mark::where('student_id', $user->id)
          ->whereIn('lesson_id', $request->lessons)
          ->get();
        break;
    }

    return response()->json($marks, 200);
  }

  public function store(MarkStoreRequest $request): JsonResponse
  {
    $mark = Mark::create($request->only([
      'student_id',
      'lesson_id',
      'score_1',
      'score_2',
      'attendance',
      'comment',
    ]));

    broadcast(new MarkEvents());

    return response()->json(Mark::selectBasic()->find($mark->id), 201);
  }

  public function update(MarkUpdateRequest $request): JsonResponse
  {
    Mark::findOrFail($request->id)
      ->update($request->only([
        'score_1',
        'score_2',
        'attendance',
        'comment',
      ]));

    broadcast(new MarkEvents());

    return response()->json(Mark::selectBasic()->find($request->id), 200);
  }

  public function getMarksByStudentIds(Request $request): JsonResponse
  {
    $marks = Mark::whereIn('student_id', $request->ids)->get();

    broadcast(new MarkEvents());

    return response()->json($marks, 200);
  }
}
