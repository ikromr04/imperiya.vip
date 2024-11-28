<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
  Route::get('/check', [AuthController::class, 'check']);
  Route::post('/login', [AuthController::class, 'login']);
  Route::post('/forgot-password', [AuthController::class, 'sendPasswordResetEmail']);
  Route::post('/reset-password', [AuthController::class, 'resetPassword']);

  Route::delete('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
});
