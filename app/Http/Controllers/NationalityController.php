<?php

namespace App\Http\Controllers;

use App\Models\Nationality;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class NationalityController extends Controller
{
  public function index(): JsonResponse
  {
    $nationalities = Nationality::select(
      'id',
      'name',
    )->get();

    return response()->json($nationalities, 200);
  }
}
