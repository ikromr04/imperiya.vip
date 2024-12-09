<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

require base_path('routes/auth.php');

Route::prefix('users')->middleware('auth:sanctum')->group(function () {
  Route::get('/', [UserController::class, 'index']);
});

