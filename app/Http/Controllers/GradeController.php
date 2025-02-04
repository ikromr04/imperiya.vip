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
    $grades = Grade::orderBy('level')
      ->selectBasic()
      ->get();

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
      ->find($grade->id);

    return response()->json($grade, 200);
  }

  public function update(Request $request): JsonResponse
  {
    $grade = Grade::selectBasic()->findOrFail($request->id);

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

    $updatedGrade = Grade::selectBasic()->find($grade->id);

    return response()->json($updatedGrade);
  }

  public function delete(Request $request)
  {
    $grade = Grade::selectBasic()->find($request->gradeId);

    if (!$grade) {
      return response()->json(['message' => 'Класс не найден.'], 404);
    }

    if ($request->students_deletion && $grade->students) {
      foreach ($grade->students as $student) {
        $student->user->delete();
      }
    }

    $grade->delete();

    return response()->noContent();
  }
}
