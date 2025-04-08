<?php

use App\Http\Controllers\GradeController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\NationalityController;
use App\Http\Controllers\ProfessionController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

require base_path('routes/auth.php');


Route::get('/nationalities', [NationalityController::class, 'index']);
Route::get('/professions', [ProfessionController::class, 'index']);
Route::get('/grades', [GradeController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
  Route::prefix('users')->group(function () {
    Route::get('/', [UserController::class, 'index']);
    Route::post('/', [UserController::class, 'store']);
    Route::put('/', [UserController::class, 'update']);
    Route::get('/login/{login}', [UserController::class, 'checkLogin']);
    Route::get('/{id}', [UserController::class, 'show']);
    Route::delete('/{id}', [UserController::class, 'delete']);
    Route::put('/{id}/avatar', [UserController::class, 'updateAvatar']);
    Route::delete('/{id}/avatar', [UserController::class, 'deleteAvatar']);
    Route::put('/{id}/role', [UserController::class, 'updateRole']);
  });

  Route::prefix('grades')->group(function () {
    Route::post('/', [GradeController::class, 'store']);
    Route::put('/', [GradeController::class, 'update']);
    Route::delete('/{id}', [GradeController::class, 'delete']);
  });

  Route::prefix('lessons')->group(function () {
    Route::get('/', [SubjectController::class, 'index']);
    Route::post('/', [SubjectController::class, 'store']);
    Route::put('/', [SubjectController::class, 'update']);
  });

  Route::prefix('schedules')->group(function () {
    Route::get('/', [LessonController::class, 'index']);
    Route::post('/', [LessonController::class, 'store']);
    Route::put('/', [LessonController::class, 'update']);
    Route::delete('/{id}', [LessonController::class, 'delete']);
  });

  Route::get('/journal', [LessonController::class, 'journal']);
  Route::post('/evaluations', [LessonController::class, 'storeEvaluation']);
  Route::put('/evaluations', [LessonController::class, 'updateEvaluation']);
});
