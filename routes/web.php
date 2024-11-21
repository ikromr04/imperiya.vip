<?php

use Illuminate\Support\Facades\Route;

Route::view('/', 'app')->name('home');

Route::view('/{path}', 'journal')->where('path', '.*')->name('journal');
