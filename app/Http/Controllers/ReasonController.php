<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\ReasonStoreRequest;
use App\Http\Requests\ReasonUpdateRequest;
use App\Models\Reason;

class ReasonController extends Controller
{
  public function index(): JsonResponse
  {
    $reasons = Reason::selectBasic()->orderBy('description')->get();

    return response()->json($reasons, 200);
  }

  public function store(ReasonStoreRequest $request): JsonResponse
  {
    $reason = Reason::create($request->only(['description']));

    return response()->json([
      'id' => $reason->id,
      'description' => $reason->description,
    ], 201);
  }

  public function update(ReasonUpdateRequest $request): JsonResponse
  {
    $reason = Reason::findOrFail($request->id);

    $reason->update($request->only('description'));

    return response()->json([
      'id' => $reason->id,
      'description' => $reason->description,
    ], 200);
  }

  public function delete(Request $request)
  {
    Reason::findOrFail($request->id)->delete();

    return response()->noContent();
  }
}
