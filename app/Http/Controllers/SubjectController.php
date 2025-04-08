<?php

namespace App\Http\Controllers;

use App\Http\Requests\SubjectStoreRequest;
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

  public function update(Request $request): JsonResponse
  {
    $subject = Subject::findOrFail($request->id);

    $subject->update($request->only('name'));

    return response()->json([
      'id' => $subject->id,
      'name' => $subject->name,
    ], 200);
  }
}
