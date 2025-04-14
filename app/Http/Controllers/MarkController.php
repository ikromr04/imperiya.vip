<?php

namespace App\Http\Controllers;

use App\Models\Mark;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class MarkController extends Controller
{
  public function index(Request $request): JsonResponse
  {
    $user = $request->user();

    $marks = Mark::where('student_id', $user->id)
      ->whereIn('lesson_id', $request->lessons)
      ->get();

    return response()->json($marks, 200);
  }

  public function store(Request $request): JsonResponse
  {
    $mark = Mark::create($request->only([
      'score_1',
      'score_2',
      'attendance',
      'comment',
      'student_id',
      'lesson_id',
    ]));

    return response()->json($mark, 201);
  }

  public function update(Request $request): JsonResponse
  {
    $mark = Mark::findOrFail($request->id)
      ->update($request->only([
        'score_1',
        'score_2',
        'attendance',
        'comment',
      ]));

    return response()->json($mark, 200);
  }
}
