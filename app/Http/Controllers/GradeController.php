<?php

namespace App\Http\Controllers;

use App\Models\Grade;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GradeController extends Controller
{
  public function index(): JsonResponse
  {
    $grades = Grade::orderBy('level')
      ->selectBasic()
      ->with([
        'students' => fn($query) => $query->select(
          'id',
          'user_id',
          'grade_id',
        )->with(['user' => fn($query) => $query->select('id', 'name')]),
      ])->get();

    return response()->json($grades, 200);
  }

  public function store(Request $request): JsonResponse
  {
    $grade = Grade::create([
      'level' => $request->level,
      'group' => $request->group,
    ]);

    $grade = Grade::orderBy('level')
      ->selectBasic()
      ->with([
        'students' => fn($query) => $query->select(
          'id',
          'user_id',
          'grade_id',
        )->with(['user' => fn($query) => $query->select('id', 'name')]),
      ])->find($grade->id);

      return response()->json($grade, 200);
  }
}
