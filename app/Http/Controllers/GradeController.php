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
    $grades = Grade::orderBy('level')->selectBasic()->get();

    return response()->json($grades, 200);
  }

  public function store(Request $request): JsonResponse
  {
    Grade::create($request->only(['level', 'group']));

    return response()->json(Grade::orderBy('level')->selectBasic()->get(), 200);
  }

  public function update(Request $request): JsonResponse
  {
    $grade = Grade::findOrFail($request->id);

    $grade->update([
      'level' => $request->level,
      'group' => $request->group,
    ]);

    $newStudentIds = collect($request->students);

    $grade->students()
      ->whereNotIn('id', $newStudentIds)
      ->update(['grade_id' => null]);

    Student::whereIn('id', $newStudentIds)
      ->update(['grade_id' => $grade->id]);

    return response()->json(Grade::orderBy('level')->selectBasic()->get(), 200);
  }

  public function delete(Request $request)
  {
    $grade = Grade::findOrFail($request->gradeId);

    $grade->students()->update(['grade_id' => null]);

    $grade->delete();

    return response()->noContent();
  }
}
