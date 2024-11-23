<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\ResetPasswordLinkRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Mail\ResetPasswordLinkEmail;
use App\Models\User;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;

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

  public function sendResetLink(ResetPasswordLinkRequest $request)
  {
    $token = Str::random(64);

    DB::table('password_reset_tokens')->updateOrInsert(
      ['email' => $request->email],
      [
        'token' => $token,
        'created_at' => Carbon::now(),
      ],
    );

    try {
      Mail::to($request->email)->send(new ResetPasswordLinkEmail($token));

      return response()->json(['message' => 'Письмо со ссылкой для сброса пароля успешно отправлено!'], 200);
    } catch (\Throwable $th) {
      return response()->json(['message' => 'Не удалось отправить ссылку для сброса.'], 500);
    }
  }

  public function resetPassword(ResetPasswordRequest $request)
  {
    $resetRecord = DB::table('password_reset_tokens')
      ->where('token', $request->token)
      ->first();

    if (!$resetRecord) return response()->json(['message' => 'Сброс не удался. Недействительный или просроченный токен.'], 500);

    if (!Carbon::parse($resetRecord->created_at)->addMinutes(config('auth.passwords.' . config('auth.defaults.passwords') . '.expire'))->isFuture())
      return response()->json(['message' => 'Просроченный токен.'], 400);

    try {
      $user = User::where('email', $resetRecord->email)->first();
      $user->password = bcrypt($request->password);
      $user->save();

      DB::table('password_reset_tokens')
        ->where('token', $request->token)
        ->delete();

      return response()->json(['message' => 'Пароль успешно сброшен.'], 200);
    } catch (\Throwable $th) {
      response()->json(['message' => 'Сброс не удался.'], 400);
    }
  }
}
