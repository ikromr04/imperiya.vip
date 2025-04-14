<?php

use App\Http\Controllers\GradeController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\MarkController;
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
  Route::get('/subjects', [SubjectController::class, 'index']);
  Route::get('/lessons', [LessonController::class, 'index']);
  Route::post('/marks/diary', [MarkController::class, 'index']);

  Route::middleware('ability:student')->group(function () {
    Route::get('/users/student', [UserController::class, 'student']);
  });

  Route::middleware('abilities:superadmin')->group(function () {
    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users', [UserController::class, 'store']);
    Route::put('/users', [UserController::class, 'update']);
    Route::get('/users/login/{login}', [UserController::class, 'checkLogin']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::delete('/users/{id}', [UserController::class, 'delete']);
    Route::put('/users/{id}/avatar', [UserController::class, 'updateAvatar']);
    Route::delete('/users/{id}/avatar', [UserController::class, 'deleteAvatar']);
    Route::put('/users/{id}/role', [UserController::class, 'updateRole']);

    Route::post('/grades', [GradeController::class, 'store']);
    Route::put('/grades', [GradeController::class, 'update']);
    Route::delete('/grades/{id}', [GradeController::class, 'delete']);

    Route::post('/subjects', [SubjectController::class, 'store']);
    Route::put('/subjects', [SubjectController::class, 'update']);

    Route::post('/lessons', [LessonController::class, 'store']);
    Route::put('/lessons', [LessonController::class, 'update']);
    Route::delete('/lessons/{id}', [LessonController::class, 'delete']);

    Route::get('/journal', [LessonController::class, 'journal']);

    Route::post('/marks', [MarkController::class, 'store']);
    Route::put('/marks', [MarkController::class, 'update']);
  });
});
