<?php

namespace App\Http\Controllers;

use App\Models\Gender;
use Illuminate\Http\JsonResponse;

class GenderController extends Controller
{
  public function index(): JsonResponse
  {
    $genders = Gender::orderBy('name')->select('id', 'name')->get();

    return response()->json($genders, 200);
  }
}
