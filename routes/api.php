<?php

use App\Http\Controllers\GradeController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\MarkController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\NationalityController;
use App\Http\Controllers\ProfessionController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

require base_path('routes/auth.php');


Route::get('/nationalities', [NationalityController::class, 'index']);
Route::get('/professions', [ProfessionController::class, 'index']);
Route::get('/grades', [GradeController::class, 'index']);

Route::middleware(['auth:sanctum', 'ability:superadmin,teacher'])->group(function () {
  Route::post('/ratings', [RatingController::class, 'store']);
  Route::post('/marks', [MarkController::class, 'store']);
  Route::put('/lessons', [LessonController::class, 'update']);
});

Route::middleware('auth:sanctum')->group(function () {
  Route::get('/users', [UserController::class, 'index']);
  Route::get('/subjects', [SubjectController::class, 'index']);
  Route::get('/lessons', [LessonController::class, 'index']);
  Route::post('/marks/diary', [MarkController::class, 'index']);
  Route::get('/ratings/dates', [RatingController::class, 'dates']);
  Route::get('/lessons/types', [LessonController::class, 'types']);
  Route::get('/journal', [LessonController::class, 'journal']);
  Route::get('/ratings', [RatingController::class, 'index']);

  Route::middleware('ability:student')->group(function () {
    Route::get('/users/student', [UserController::class, 'student']);
  });

  Route::middleware('abilities:superadmin')->group(function () {
    Route::post('/users', [UserController::class, 'store']);
    Route::put('/users', [UserController::class, 'update']);
    Route::get('/users/login/{login}', [UserController::class, 'checkLogin']);
    Route::delete('/users/{id}', [UserController::class, 'delete']);
    Route::put('/users/{id}/avatar', [UserController::class, 'updateAvatar']);
    Route::delete('/users/{id}/avatar', [UserController::class, 'deleteAvatar']);
    Route::put('/users/{id}/role', [UserController::class, 'updateRole']);

    Route::post('/grades', [GradeController::class, 'store']);
    Route::put('/grades', [GradeController::class, 'update']);
    Route::delete('/grades/{id}', [GradeController::class, 'delete']);

    Route::post('/subjects', [SubjectController::class, 'store']);
    Route::put('/subjects', [SubjectController::class, 'update']);
    Route::delete('/subjects/{id}', [SubjectController::class, 'delete']);

    Route::post('/nationalities', [NationalityController::class, 'store']);
    Route::put('/nationalities', [NationalityController::class, 'update']);
    Route::delete('/nationalities/{id}', [NationalityController::class, 'delete']);

    Route::post('/professions', [ProfessionController::class, 'store']);
    Route::put('/professions', [ProfessionController::class, 'update']);
    Route::delete('/professions/{id}', [ProfessionController::class, 'delete']);

    Route::post('/lessons/types', [LessonController::class, 'storeType']);
    Route::put('/lessons/types', [LessonController::class, 'updateType']);
    Route::delete('/lessons/types/{id}', [LessonController::class, 'deleteType']);

    Route::post('/lessons', [LessonController::class, 'store']);
    Route::delete('/lessons/{id}', [LessonController::class, 'delete']);

    Route::put('/marks', [MarkController::class, 'update']);

    Route::put('/ratings/dates', [RatingController::class, 'updateDate']);
    Route::put('/ratings', [RatingController::class, 'update']);
  });
});
