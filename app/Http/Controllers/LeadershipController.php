<?php

namespace App\Http\Controllers;

use App\Models\Grade;
use App\Models\Mark;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class LeadershipController extends Controller
{
  public function index(): JsonResponse
  {
    $user = request()->user();
    $users = collect();
    $marks = collect();
    $grades = collect();

    switch ($user->role) {
      case 'superadmin':
      case 'admin':
        $users = User::select('id', 'name', 'surname', 'patronymic', 'avatar_thumb', 'role')
          ->where('role', 'student')
          ->with(['student:id,user_id,grade_id'])->get();

        $marks = Mark::select('id', 'student_id', 'score_1', 'score_2')
          ->where(function ($query) {
            $query->whereNotNull('score_1')
              ->orWhereNotNull('score_2');
          })
          ->get();

        $grades = Grade::select('id', 'level', 'group')->get();
        break;

      case 'teacher':
        $userIds = Student::where('grade_id', request()->query('gradeId'))->pluck('user_id');

        $users = User::select('id', 'name', 'surname', 'patronymic', 'avatar_thumb', 'role')
          ->whereIn('id', $userIds)
          ->with(['student:id,user_id,grade_id'])->get();

        $marks = Mark::select('id', 'student_id', 'score_1', 'score_2')
          ->whereIn('student_id', $userIds)
          ->where(function ($query) {
            $query->whereNotNull('score_1')
              ->orWhereNotNull('score_2');
          })
          ->get();

        $grades = Grade::select('id', 'level', 'group')->get();
        break;

      case 'parent':
        $user = User::findOrFail(request()->query('studentId'));

        if (!$user->blocked_at) {
          $student = Student::where('user_id', $user->id)->first();
          $userIds = Student::where('grade_id', $student->grade_id)->pluck('user_id');

          $users = User::select('id', 'name', 'surname', 'patronymic', 'avatar_thumb', 'role')
            ->whereIn('id', $userIds)
            ->with(['student:id,user_id,grade_id'])->get();

          $marks = Mark::select('id', 'student_id', 'score_1', 'score_2')
            ->whereIn('student_id', $userIds)
            ->where(function ($query) {
              $query->whereNotNull('score_1')
                ->orWhereNotNull('score_2');
            })
            ->get();

          $grades = Grade::select('id', 'level', 'group')->get();
        }
        break;

      case 'student':
        $student = Student::where('user_id', $user->id)->first();
        $userIds = Student::where('grade_id', $student->grade_id)->pluck('user_id');

        $users = User::select('id', 'name', 'surname', 'patronymic', 'avatar_thumb', 'role')
          ->whereIn('id', $userIds)
          ->with(['student:id,user_id,grade_id'])->get();

        $marks = Mark::select('id', 'student_id', 'score_1', 'score_2')
          ->whereIn('student_id', $userIds)
          ->where(function ($query) {
            $query->whereNotNull('score_1')
              ->orWhereNotNull('score_2');
          })
          ->get();

        $grades = Grade::select('id', 'level', 'group')->get();
        break;
    }

    return response()->json([
      'users' => $users,
      'marks' => $marks,
      'grades' => $grades,
    ], 200);
  }
}
