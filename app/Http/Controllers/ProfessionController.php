<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfessionStoreRequest;
use App\Http\Requests\ProfessionUpdateRequest;
use App\Models\Profession;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProfessionController extends Controller
{
  public function index(): JsonResponse
  {
    $profession = Profession::selectBasic()->orderBy('name')->get();

    return response()->json($profession, 200);
  }

  public function store(ProfessionStoreRequest $request): JsonResponse
  {
    $profession = Profession::create($request->only(['name']));

    return response()->json([
      'id' => $profession->id,
      'name' => $profession->name,
    ], 201);
  }

  public function update(ProfessionUpdateRequest $request): JsonResponse
  {
    $profession = Profession::findOrFail($request->id);

    $profession->update($request->only('name'));

    return response()->json([
      'id' => $profession->id,
      'name' => $profession->name,
    ], 200);
  }

  public function delete(Request $request)
  {
    Profession::findOrFail($request->id)->delete();

    return response()->noContent();
  }
}
