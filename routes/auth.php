<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
  Route::get('/check', [AuthController::class, 'check']);
  Route::post('/register', [AuthController::class, 'register']);
  Route::post('/login', [AuthController::class, 'login']);
  Route::post('/forgot-password', [AuthController::class, 'sendPasswordResetEmail']);
  Route::post('/reset-password', [AuthController::class, 'resetPassword']);
  Route::get('/register', [AuthController::class, 'checkRegisterLink']);

  Route::middleware('auth:sanctum')->group(function () {
    Route::delete('/logout', [AuthController::class, 'logout']);
    Route::get('/register/links', [AuthController::class, 'getRegisterLinks']);
    Route::post('/register/links', [AuthController::class, 'generateRegisterLink']);
    Route::put('/register/links/{id}', [AuthController::class, 'updateRegisterLink']);
    Route::delete('/register/links/{id}', [AuthController::class, 'deleteRegisterLink']);
    Route::get('/ratings', [AuthController::class, 'getRatings']);
  });
});
