<?php

namespace App\Http\Controllers;

use App\Models\Nationality;
use Illuminate\Http\JsonResponse;

class NationalityController extends Controller
{
  public function index(): JsonResponse
  {
    $nationalities = Nationality::orderBy('name')->select('id', 'name')->get();

    return response()->json($nationalities, 200);
  }
}
