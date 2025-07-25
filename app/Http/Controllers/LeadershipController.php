<?php

namespace App\Http\Controllers;

use App\Models\Grade;
use App\Models\Mark;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class LeadershipController extends Controller
{
  public function index(): JsonResponse
  {
    $users = User::select('id', 'name', 'surname', 'patronymic', 'avatar_thumb', 'role')
      ->where('role', 'student')
      ->with(['student:id,user_id,grade_id'])->get();

    $marks = Mark::select('id', 'student_id', 'score_1', 'score_2')
      ->whereNotNull('score_1')
      ->orWhereNotNull('score_2')
      ->get();

    $grades = Grade::select('id', 'level', 'group')->get();

    return response()->json([
      'users' => $users,
      'marks' => $marks,
      'grades' => $grades,
    ], 200);
  }
}
