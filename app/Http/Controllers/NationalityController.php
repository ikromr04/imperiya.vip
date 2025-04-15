<?php

namespace App\Http\Controllers;

use App\Http\Requests\NationalityStoreRequest;
use App\Http\Requests\NationalityUpdateRequest;
use App\Models\Nationality;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class NationalityController extends Controller
{
  public function index(): JsonResponse
  {
    $nationalities = Nationality::selectBasic()->orderBy('name')->get();

    return response()->json($nationalities, 200);
  }

  public function store(NationalityStoreRequest $request): JsonResponse
  {
    $nationality = Nationality::create($request->only(['name']));

    return response()->json([
      'id' => $nationality->id,
      'name' => $nationality->name,
    ], 201);
  }

  public function update(NationalityUpdateRequest $request): JsonResponse
  {
    $nationality = Nationality::findOrFail($request->id);

    $nationality->update($request->only('name'));

    return response()->json([
      'id' => $nationality->id,
      'name' => $nationality->name,
    ], 200);
  }

  public function delete(Request $request)
  {
    Nationality::findOrFail($request->id)->delete();

    return response()->noContent();
  }
}
