<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class BooksController extends Controller
{
  public function index(): JsonResponse
  {
    $user = request()->user();
    $books = collect();

    switch ($user->role) {
      case 'superadmin':
        $books = Book::selectBasic()->orderBy('title')->get();
        break;

      case 'student':
        $books = Book::selectBasic()
          ->whereIn('access', ['students', 'all'])
          ->orderBy('title')
          ->get();
        break;
    }


    return response()->json($books, 200);
  }

  public function store(Request $request): JsonResponse
  {
    $book = new Book();

    $book->book_category_id = $request->category_id;
    $book->title = $request->title;
    $book->access = $request->access;
    $book->lang = $request->lang;
    $book->link = $request->link ?? null;
    $book->description = $request->description ?? null;

    if ($request->file('file')) {
      $file = $request->file('file');
      $fileName = uniqid() . '.' . $file->extension();
      $filePath = "/bookstore/$fileName";

      $file->move(public_path('/bookstore'), $fileName);

      $book->link = $filePath;
    }

    $book->save();

    return response()->json([
      'id' => $book->id,
      'categoryId' => $book->book_category_id,
      'title' => $book->title,
      'access' => $book->access,
      'lang' => $book->lang,
      'link' => $book->link,
      'description' => $book->description,
    ], 201);
  }

  public function update(Request $request): JsonResponse
  {
    $book = Book::findOrFail($request->id);

    $book->book_category_id = $request->category_id;
    $book->title = $request->title;
    $book->access = $request->access;
    $book->lang = $request->lang;
    $book->link = $request->link ?? $book->link;
    $book->description = $request->description;

    if ($request->file('file')) {
      if ($book->link && file_exists(public_path($book->link))) {
        unlink(public_path($book->link));
      }

      $file = $request->file('file');
      $fileName = uniqid() . '.' . $file->extension();
      $filePath = "/bookstore/$fileName";

      $file->move(public_path('/bookstore'), $fileName);

      $book->link = $filePath;
    }

    $book->update();

    return response()->json([
      'id' => $book->id,
      'categoryId' => $book->book_category_id,
      'title' => $book->title,
      'access' => $book->access,
      'lang' => $book->lang,
      'link' => $book->link,
      'description' => $book->description,
    ], 201);
  }

  public function delete(Request $request)
  {
    $book = Book::findOrFail($request->id);

    if ($book->link && file_exists(public_path($book->link))) {
      unlink(public_path($book->link));
    }

    $book->delete();

    return response()->noContent();
  }
}
