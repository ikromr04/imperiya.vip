<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Director;
use App\Models\Guardian;
use App\Models\Student;
use App\Models\Superadmin;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Intervention\Image\Facades\Image;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
  public function index(): JsonResponse
  {
    $users = User::selectBasic()->get();

    return response()->json($users, 200);
  }

  public function store(Request $request): JsonResponse
  {
    $user = User::create($request->only([
      'name',
      'login',
      'role',
      'sex',
      'email',
      'birth_date',
      'address',
      'nationality',
      'social_link',
      'phone_numbers',
    ]));

    switch ($user->role) {
      case 'superadmin':
        Superadmin::create(['user_id' => $user->id]);
        break;
      case 'admin':
        Admin::create(['user_id' => $user->id]);
        break;
      case 'director':
        Director::create(['user_id' => $user->id]);
        break;
      case 'teacher':
        Teacher::create(['user_id' => $user->id]);
        break;
      case 'parent':
        Guardian::create(['user_id' => $user->id]);
        if ($user->sex === 'male') {
          Student::whereIn('user_id', collect($request->children))
            ->update(['father_id' => $user->id]);
        } else {
          Student::whereIn('user_id', collect($request->children))
            ->update(['mother_id' => $user->id]);
        }
        break;
      case 'student':
        Student::create([
          'user_id' => $user->id,
          'grade_id' => $request->grade_id,
          'mother_id' => $request->mother_id,
          'father_id' => $request->father_id,
        ]);
        break;
    }

    return response()->json(User::selectBasic()->find($user->id), 201);
  }

  public function update(Request $request): JsonResponse
  {
    $user = User::findOrFail($request->id);

    if ($user->login !== $request->login && User::where('login', $request->login)->exists()) {
      throw ValidationException::withMessages(['login' => ['Пользователь с таким логином уже существует.']]);
    }

    $user->update($request->only([
      'name',
      'login',
      'email',
      'birth_date',
      'address',
      'sex',
      'nationality',
      'social_link',
      'phone_numbers',
    ]));

    return response()->json(User::selectBasic()->find($user->id), 200);
  }

  public function show(int $userId): JsonResponse
  {
    $user = User::selectBasic()->find($userId);

    return response()->json($user, 200);
  }

  public function checkLogin(string $login)
  {
    if (User::where('login', $login)->exists()) {
      throw ValidationException::withMessages(['login' => ['Пользователь с таким логином уже существует.']]);
    } else {
      return response()->json(['message' => 'Валидный логин'], 200);
    }
  }

  public function delete(Request $request)
  {
    $user = User::findOrFail($request->userId);

    $user->delete();

    return response()->noContent();
  }

  public function updateAvatar(int $userId)
  {
    $user = User::findOrFail($userId);

    foreach (['avatar', 'avatar_thumb'] as $field) {
      if ($user->$field && file_exists(public_path($user->$field))) {
        unlink(public_path($user->$field));
      }
    }

    $avatar = request()->file('avatar');
    $avatarName = uniqid() . '.' . $avatar->extension();
    $avatarThumbPath = "/images/users/thumbs/$avatarName";
    $avatarPath = "/images/users/$avatarName";

    Image::make($avatar)
      ->resize(144, 144, function ($constraint) {
        $constraint->aspectRatio();
      })
      ->save(public_path($avatarThumbPath));

    $avatar->move(public_path('/images/users'), $avatarName);

    $user->update([
      'avatar' => $avatarPath,
      'avatar_thumb' => $avatarThumbPath,
    ]);

    return response(User::selectBasic()->find($userId), 200);
  }

  public function deleteAvatar($id)
  {
    $user = User::findOrFail($id);

    foreach (['avatar', 'avatar_thumb'] as $field) {
      if ($user->$field && file_exists(public_path($user->$field))) {
        unlink(public_path($user->$field));
        $user->$field = '';
      }
    }

    $user->save();

    return response()->noContent();
  }
}
