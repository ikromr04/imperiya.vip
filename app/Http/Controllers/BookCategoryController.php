<?php

namespace App\Http\Controllers;

use App\Models\BookCategory;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class BookCategoryController extends Controller
{
  public function index(): JsonResponse
  {
    $categories = BookCategory::selectBasic()->orderBy('title')->get();

    return response()->json($categories, 200);
  }

  public function store(Request $request): JsonResponse
  {
    $category = BookCategory::create($request->only(['title']));

    return response()->json([
      'id' => $category->id,
      'title' => $category->title,
    ], 201);
  }

  public function update(Request $request): JsonResponse
  {
    $category = BookCategory::findOrFail($request->id);

    $category->update($request->only('title'));

    return response()->json([
      'id' => $category->id,
      'title' => $category->title,
    ], 200);
  }

  public function delete(Request $request)
  {
    BookCategory::findOrFail($request->id)->delete();

    return response()->noContent();
  }
}
