<?php

use Illuminate\Support\Facades\Route;

Route::view('/', 'app')->name('home');
Route::view('/reset', 'emails.reset-password-link');

Route::view('/{path}', 'journal')->where('path', '.*')->name('journal');
