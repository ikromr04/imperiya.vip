<?php

namespace App\Http\Controllers;

use App\Http\Requests\SubjectStoreRequest;
use App\Http\Requests\SubjectUpdateRequest;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class SubjectController extends Controller
{
  public function index(): JsonResponse
  {
    $subjects = Subject::selectBasic()->orderBy('name')->get();

    return response()->json($subjects, 200);
  }

  public function store(SubjectStoreRequest $request): JsonResponse
  {
    $subject = Subject::create($request->only(['name']));

    return response()->json([
      'id' => $subject->id,
      'name' => $subject->name,
    ], 201);
  }

  public function update(SubjectUpdateRequest $request): JsonResponse
  {
    $subject = Subject::findOrFail($request->id);

    $subject->update($request->only('name'));

    return response()->json([
      'id' => $subject->id,
      'name' => $subject->name,
    ], 200);
  }

  public function delete(Request $request)
  {
    Subject::findOrFail($request->id)->delete();

    return response()->noContent();
  }
}
