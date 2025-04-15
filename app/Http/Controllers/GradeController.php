<?php

namespace App\Http\Controllers;

use App\Models\Grade;
use App\Models\Student;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GradeController extends Controller
{
  public function index(): JsonResponse
  {
    $grades = Grade::selectBasic()->orderBy('level')->get();

    return response()->json($grades, 200);
  }

  public function store(Request $request): JsonResponse
  {
    $grade = Grade::create($request->only([
      'level',
      'group',
      'teacher_id',
    ]));

    return response()->json([
      'id' => $grade->id,
      'level' => $grade->level,
      'group' => $grade->group,
      'teacher_id' => $grade->teacher_id,
    ], 201);
  }

  public function update(Request $request): JsonResponse
  {
    $grade = Grade::findOrFail($request->id);

    $grade->update($request->only([
      'level',
      'group',
      'teacher_id'
    ]));

    $newStudentIds = collect($request->students);

    $grade->students()
      ->whereNotIn('user_id', $newStudentIds)
      ->update(['grade_id' => null]);

    Student::whereIn('user_id', $newStudentIds)
      ->update(['grade_id' => $grade->id]);

    return response()->json(Grade::selectBasic()->find($grade->id), 200);
  }

  public function delete(Request $request)
  {
    $grade = Grade::findOrFail($request->id);

    $grade->students()->update(['grade_id' => null]);

    $grade->delete();

    return response()->noContent();
  }
}
