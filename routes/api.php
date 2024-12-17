<?php

use App\Http\Controllers\GenderController;
use App\Http\Controllers\GradeController;
use App\Http\Controllers\NationalityController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

require base_path('routes/auth.php');


Route::middleware('auth:sanctum')->group(function () {
  Route::prefix('users')->group(function () {
    Route::get('/', [UserController::class, 'index']);
  });

  Route::prefix('genders')->group(function () {
    Route::get('/', [GenderController::class, 'index']);
  });

  Route::prefix('roles')->group(function () {
    Route::get('/', [RoleController::class, 'index']);
  });

  Route::prefix('grades')->group(function () {
    Route::get('/', [GradeController::class, 'index']);
  });

  Route::prefix('nationalities')->group(function () {
    Route::get('/', [NationalityController::class, 'index']);
  });
});
