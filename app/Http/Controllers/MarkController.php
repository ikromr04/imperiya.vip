<?php

namespace App\Http\Controllers;

use App\Http\Requests\MarkStoreRequest;
use App\Http\Requests\MarkUpdateRequest;
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

    return response()->json(Mark::selectBasic()->find($request->id), 200);
  }
}
