<?php

namespace App\Http\Controllers;

use App\Models\Grade;
use Illuminate\Http\JsonResponse;

class GradeController extends Controller
{
  public function index(): JsonResponse
  {
    $grades = Grade::orderBy('level')->select('id', 'level', 'group')->get();

    return response()->json($grades, 200);
  }
}
