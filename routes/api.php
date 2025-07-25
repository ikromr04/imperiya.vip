<?php

use App\Http\Controllers\BookCategoryController;
use App\Http\Controllers\BooksController;
use App\Http\Controllers\GradeController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\MarkController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\NationalityController;
use App\Http\Controllers\ProfessionController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\ReasonController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

require base_path('routes/auth.php');

Route::prefix('users')->controller(UserController::class)->group(function () {
  Route::get('/', 'index')->middleware('auth:sanctum');
  Route::post('/', 'store')->middleware(['auth:sanctum', 'ability:superadmin']);
  Route::put('/{id}', 'update')->middleware(['auth:sanctum', 'ability:superadmin']);
  Route::delete('/{id}', 'delete')->middleware(['auth:sanctum', 'ability:superadmin']);
  Route::put('/{id}/avatar', 'updateAvatar')->middleware(['auth:sanctum', 'ability:superadmin']);
  Route::delete('/{id}/avatar', 'deleteAvatar')->middleware(['auth:sanctum', 'ability:superadmin']);
  Route::put('/{id}/role', 'updateRole')->middleware(['auth:sanctum', 'ability:superadmin']);
  Route::get('/{id}/ratings', 'getRatings')->middleware(['auth:sanctum', 'ability:superadmin,parent']);
});

Route::prefix('nationalities')->controller(NationalityController::class)->group(function () {
  Route::get('/', 'index');
  Route::post('/', 'store')->middleware(['auth:sanctum', 'ability:superadmin']);
  Route::put('/{id}', 'update')->middleware(['auth:sanctum', 'ability:superadmin']);
  Route::delete('/{id}', 'delete')->middleware(['auth:sanctum', 'ability:superadmin']);
});

Route::prefix('grades')->controller(GradeController::class)->group(function () {
  Route::get('/', 'index');
  Route::post('/', 'store')->middleware(['auth:sanctum', 'ability:superadmin']);
  Route::put('/{id}', 'update')->middleware(['auth:sanctum', 'ability:superadmin']);
  Route::delete('/{id}', 'delete')->middleware(['auth:sanctum', 'ability:superadmin']);
});

Route::prefix('professions')->controller(ProfessionController::class)->group(function () {
  Route::get('/', 'index');
  Route::post('/', 'store')->middleware(['auth:sanctum', 'ability:superadmin']);
  Route::put('/{id}', 'update')->middleware(['auth:sanctum', 'ability:superadmin']);
  Route::delete('/{id}', 'delete')->middleware(['auth:sanctum', 'ability:superadmin']);
});


Route::prefix('lessons')->controller(LessonController::class)->group(function () {
  Route::get('/', 'index')->middleware('auth:sanctum');
  Route::post('/', 'store')->middleware(['auth:sanctum', 'ability:superadmin']);
  Route::put('/{id}', 'update')->middleware(['auth:sanctum', 'ability:superadmin,teacher']);
  Route::put('/{id}/topic', 'updateTopic')->middleware(['auth:sanctum', 'ability:superadmin,teacher']);
  Route::delete('/{id}', 'delete')->middleware(['auth:sanctum', 'ability:superadmin']);
  Route::get('/types', 'types')->middleware('auth:sanctum');
  Route::post('/types', 'storeType')->middleware(['auth:sanctum', 'ability:superadmin']);
  Route::put('/types/{id}', 'updateType')->middleware(['auth:sanctum', 'ability:superadmin']);
  Route::delete('/types/{id}', 'deleteType')->middleware(['auth:sanctum', 'ability:superadmin']);
});

Route::prefix('subjects')->controller(SubjectController::class)->group(function () {
  Route::get('/', 'index')->middleware('auth:sanctum');
  Route::post('/', 'store')->middleware(['auth:sanctum', 'ability:superadmin']);
  Route::put('/{id}', 'update')->middleware(['auth:sanctum', 'ability:superadmin']);
  Route::delete('/{id}', 'delete')->middleware(['auth:sanctum', 'ability:superadmin']);
});

Route::prefix('marks')->controller(MarkController::class)->group(function () {
  Route::get('/', 'index')->middleware(['auth:sanctum', 'ability:superadmin,teacher,parent,student']);
  Route::post('/', 'store')->middleware(['auth:sanctum', 'ability:superadmin,teacher']);
  Route::get('/', 'index')->middleware(['auth:sanctum', 'ability:superadmin,teacher,parent,student']);
  Route::put('/{id}', 'update')->middleware(['auth:sanctum', 'ability:superadmin']);
  Route::post('/students', 'getMarksByStudentIds')->middleware('auth:sanctum', 'ability:superadmin');
});

Route::prefix('ratings')->controller(RatingController::class)->group(function () {
  Route::get('/', 'index')->middleware('auth:sanctum');
  Route::get('/dates', 'dates')->middleware('auth:sanctum');
  Route::put('/dates', 'updateDate')->middleware(['auth:sanctum', 'ability:superadmin']);
  Route::put('/', 'update')->middleware(['auth:sanctum', 'ability:superadmin']);
  Route::post('/', 'store')->middleware(['auth:sanctum', 'ability:superadmin,teacher']);
});

Route::prefix('reasons')->controller(ReasonController::class)->group(function () {
  Route::get('/', 'index');
  Route::post('/', 'store')->middleware(['auth:sanctum', 'ability:superadmin']);
  Route::put('/{id}', 'update')->middleware(['auth:sanctum', 'ability:superadmin']);
  Route::delete('/{id}', 'delete')->middleware(['auth:sanctum', 'ability:superadmin']);
});

Route::prefix('book-categories')->controller(BookCategoryController::class)->group(function () {
  Route::get('/', 'index');
  Route::post('/', 'store')->middleware(['auth:sanctum', 'ability:superadmin']);
  Route::put('/{id}', 'update')->middleware(['auth:sanctum', 'ability:superadmin']);
  Route::delete('/{id}', 'delete')->middleware(['auth:sanctum', 'ability:superadmin']);
});

Route::prefix('books')->controller(BooksController::class)->group(function () {
  Route::get('/', 'index');
  Route::post('/', 'store')->middleware(['auth:sanctum', 'ability:superadmin']);
  Route::put('/{id}', 'update')->middleware(['auth:sanctum', 'ability:superadmin']);
  Route::delete('/{id}', 'delete')->middleware(['auth:sanctum', 'ability:superadmin']);
});
