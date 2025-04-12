<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
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
use Illuminate\Support\Facades\Crypt;

class UserController extends Controller
{
  public function index(): JsonResponse
  {
    $users = User::selectBasic()
      ->get()
      ->map(function ($user) {
        $user->password = Crypt::decryptString($user->password);

        return $user;
      });

    return response()->json($users, 200);
  }

  public function store(UserStoreRequest $request): JsonResponse
  {
    $user = User::create($request->only([
      'name',
      'surname',
      'patronymic',
      'role',
      'sex',
      'birth_date',
      'nationality_id',
      'email',
      'address',
      'whatsapp',
    ]));

    $user->phone_numbers = [$request->phone_numbers];
    $user->save();

    return response()->json(User::selectBasic()->find($user->id), 201);
  }

  public function update(UserUpdateRequest $request): JsonResponse
  {
    $user = User::findOrFail($request->id);

    if ($user->login !== $request->login && User::where('login', $request->login)->exists()) {
      throw ValidationException::withMessages(['login' => ['Пользователь с таким логином уже существует.']]);
    }

    $user->update($request->only([
      'name',
      'surname',
      'patronymic',
      'login',
      'sex',
      'birth_date',
      'nationality_id',
      'email',
      'address',
      'social_link',
      'phone_numbers',
      'whatsapp',
    ]));

    return response()->json(User::selectBasic()->find($user->id), 200);
  }

  public function show(int $id): JsonResponse
  {
    $user = User::selectBasic()->find($id);

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
    User::findOrFail($request->id)->delete();

    return response()->noContent();
  }

  public function updateAvatar(int $id)
  {
    $user = User::findOrFail($id);

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

    return response(User::selectBasic()->find($id), 200);
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
