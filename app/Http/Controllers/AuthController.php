<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;
use stdClass;

class AuthController extends Controller
{
  public function check()
  {
    $user = request()->user('sanctum');

    if (!$user) return response(['message' => 'Вы не авторизованы.'], 401);

    $response = [
      'id' => $user->id,
      'name' => $user->name,
      'login' => $user->login,
    ];

    if ($user->avatar) {
      $response = array_merge($response, ['avatar' => $user->avatar]);
    }

    return response($response, 200);
  }

  public function login(LoginRequest $request)
  {
    $user = User::where('login', $request->login)->first();

    if (!$user) throw ValidationException::withMessages(['login' => ['Пользователь с таким логином не найден.']]);

    if (!Hash::check($request->password, $user->password))
      throw ValidationException::withMessages(['password' => ['Неверный пароль.']]);

    $adaptedUser = [
      'id' => $user->id,
      'name' => $user->name,
      'login' => $user->login,
    ];

    if ($user->avatar) {
      $adaptedUser = array_merge($adaptedUser, ['avatar' => $user->avatar]);
    }

    return response([
      'user' => $adaptedUser,
      'token' => $user->createToken('access_token')->plainTextToken,
    ], 200);
  }

  public function logout()
  {
    $user = request()->user('sanctum');

    if (!$user) return response(['message' => 'Вы не авторизованы.'], 401);

    $user->currentAccessToken()->delete();

    return response(['message' => 'Вы успешно вышли из системы.'], 200);
  }
}
