<?php

namespace App\Http\Controllers;

use App\Http\Requests\RatingStoreRequest;
use App\Http\Requests\RatingUpdateRequest;
use App\Models\Rating;
use App\Models\RatingDate;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class RatingController extends Controller
{
  public function index(Request $request): JsonResponse
  {
    $ratings = Rating::where('years', $request->query('years'))
      ->where('grade_id', $request->query('grade_id'))
      ->where('subject_id', $request->query('subject_id'))
      ->get();

    return response()->json($ratings, 200);
  }

  public function dates(): JsonResponse
  {
    $dates = RatingDate::orderBy('years')->get();

    return response()->json($dates, 200);
  }

  public function store(RatingStoreRequest $request): JsonResponse
  {
    $rating = Rating::create($request->only([
      'years',
      'rating',
      'score',
      'student_id',
      'grade_id',
      'subject_id',
    ]));

    return response()->json(Rating::find($rating->id), 201);
  }

  public function update(RatingUpdateRequest $request): JsonResponse
  {
    Rating::findOrFail($request->id)->update($request->only(['score']));

    return response()->json(Rating::find($request->id), 200);
  }
}
