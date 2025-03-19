<?php

use App\Http\Controllers\GradeController;
use App\Http\Controllers\NationalityController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

require base_path('routes/auth.php');


Route::middleware('auth:sanctum')->group(function () {
  Route::prefix('users')->group(function () {
    Route::get('/', [UserController::class, 'index']);
    Route::post('/', [UserController::class, 'store']);
    Route::put('/', [UserController::class, 'update']);
    Route::get('/login/{login}', [UserController::class, 'checkLogin']);
    Route::get('/{userId}', [UserController::class, 'show']);
    Route::delete('/{userId}', [UserController::class, 'delete']);
    Route::put('/{userId}/avatar', [UserController::class, 'updateAvatar']);
    Route::delete('/{userId}/avatar', [UserController::class, 'deleteAvatar']);
    Route::put('/{userId}/role', [UserController::class, 'updateRole']);
  });

  Route::prefix('grades')->group(function () {
    Route::get('/', [GradeController::class, 'index']);
    Route::post('/', [GradeController::class, 'store']);
    Route::put('/', [GradeController::class, 'update']);
    Route::delete('/{gradeId}', [GradeController::class, 'delete']);
  });
});
