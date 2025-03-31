<?php

namespace App\Http\Controllers;

use App\Http\Requests\LessonStoreRequest;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class LessonController extends Controller
{
  public function index(): JsonResponse
  {
    $lessons = Lesson::selectBasic()->orderBy('name')->get();

    return response()->json($lessons, 200);
  }

  public function store(LessonStoreRequest $request): JsonResponse
  {
    $lesson = Lesson::create($request->only(['name']));

    return response()->json([
      'id' => $lesson->id,
      'name' => $lesson->name,
    ], 201);
  }

  public function update(Request $request): JsonResponse
  {
    $lesson = Lesson::findOrFail($request->id);

    $lesson->update($request->only('name'));

    return response()->json([
      'id' => $lesson->id,
      'name' => $lesson->name,
    ], 200);
  }
}
