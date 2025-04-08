<?php

namespace App\Http\Controllers;

use App\Models\Profession;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProfessionController extends Controller
{
  public function index(): JsonResponse
  {
    $professions = Profession::select(
      'id',
      'name',
    )->get();

    return response()->json($professions, 200);
  }
}
