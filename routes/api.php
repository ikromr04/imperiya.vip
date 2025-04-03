<?php

use App\Http\Controllers\GradeController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

require base_path('routes/auth.php');


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
    Route::get('/', [GradeController::class, 'index']);
    Route::post('/', [GradeController::class, 'store']);
    Route::put('/', [GradeController::class, 'update']);
    Route::delete('/{id}', [GradeController::class, 'delete']);
  });

  Route::prefix('lessons')->group(function () {
    Route::get('/', [LessonController::class, 'index']);
    Route::post('/', [LessonController::class, 'store']);
    Route::put('/', [LessonController::class, 'update']);
  });

  Route::prefix('schedules')->group(function () {
    Route::get('/', [ScheduleController::class, 'index']);
    Route::post('/', [ScheduleController::class, 'store']);
    Route::put('/', [ScheduleController::class, 'update']);
    Route::delete('/{id}', [ScheduleController::class, 'delete']);
  });

  Route::get('/journal', [ScheduleController::class, 'journal']);
  Route::post('/evaluations', [ScheduleController::class, 'storeEvaluation']);
  Route::put('/evaluations', [ScheduleController::class, 'updateEvaluation']);
});
