<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserStoreRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
  public function index(): JsonResponse
  {
    $users = User::orderBy('name')->selectBasic()->get();

    return response()->json($users, 200);
  }

  public function store(UserStoreRequest $request): JsonResponse
  {
    $user = User::create([
      'name' => $request->name,
      'login' => $request->login,
      'email' => $request->email,
      'password' => Hash::make(Str::random(8)),
      'birth_date' => $request->birth_date,
      'address' => $request->address,
      'facebook' => $request->facebook,
      'instagram' => $request->instagram,
      'odnoklassniki' => $request->odnoklassniki,
      'role_type' => $request->role_type,
      'gender_id' => $request->gender_id ? $request->gender_id : null,
      'grade_id' => $request->grade_id ? $request->grade_id : null,
      'nationality_id' => $request->nationality_id ? $request->nationality_id : null,
    ]);

    $user = User::orderBy('name')->selectBasic()->find($user->id);


    return response()->json($user, 200);
  }

  public function update(Request $request): JsonResponse
  {

    $user = User::find($request->id);
    if ($user->login != $request->login) {
      if (User::where('login', $request->login)) {
        throw ValidationException::withMessages(['login' => ['Пользователь с таким логином уже существует.']]);
      } else {
        $user->login = $request->login;
      }
    }
    $user->name = $request->name;
    $user->email = $request->email;
    $user->birth_date = $request->birth_date;
    $user->address = $request->address;
    $user->gender_id = $request->gender_id;
    $user->nationality_id = $request->nationality_id;
    $user->social_link = $request->social_link;
    $user->phone_numbers = $request->phone_numbers;
    $user->isDirty() && $user->update();

    $user = User::selectBasic()->find($request->id);

    return response()->json($user, 200);
  }

  public function show(int $userId): JsonResponse
  {
    $user = User::selectBasic()->find($userId);

    return response()->json($user, 200);
  }

  public function delete(Request $request)
  {
    $user = User::selectBasic()->find($request->userId);

    if (!$user) {
      return response()->json(['message' => 'Пользователь не найден.'], 404);
    }

    if ($request->parents_deletion && $user->student) {
      $mother = $user->student->mother;
      $father = $user->student->father;
      if ($mother) $mother->delete();
      if ($father) $father->delete();
    }

    $user->delete();

    return response()->noContent();
  }

  public function updateAvatar(int $userId)
  {
    $user = User::find($userId);

    if ($user->avatar && file_exists(public_path($user->avatar))) {
      unlink(public_path($user->avatar));
    }
    if ($user->avatar_thumb && file_exists(public_path($user->avatar_thumb))) {
      unlink(public_path($user->avatar_thumb));
    }

    $avatar = request()->file('avatar');
    $avatarThumb = Image::make($avatar);
    $avatarThumb->resize(144, 144, function ($constraint) {
      $constraint->aspectRatio();
    });
    $avatarName = uniqid() . '.' . $avatar->extension();
    $avatarPath = '/images/users/' . $avatarName;
    $avatarThumbPath = '/images/users/thumbs/' . $avatarName;
    $avatarThumb->save(public_path('/images/users/thumbs/' . $avatarName));
    $avatar->move(public_path('/images/users'), $avatarName);

    $user->avatar = $avatarPath;
    $user->avatar_thumb = $avatarThumbPath;

    $user->update();

    $user = User::selectBasic()->find($userId);

    return response($user, 200);
  }

  public function deleteAvatar($id)
  {
    $user = User::find($id);

    if ($user->avatar && file_exists(public_path($user->avatar))) {
      unlink(public_path($user->avatar));
      $user->avatar = '';
    }
    if ($user->avatar_thumb && file_exists(public_path($user->avatar_thumb))) {
      unlink(public_path($user->avatar_thumb));
      $user->avatar_thumb = '';
    }

    $user->update();

    return response()->noContent();
  }
}
