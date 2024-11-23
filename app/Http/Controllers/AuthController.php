<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\ResetPasswordLinkRequest;
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

    Mail::to($request->email)->send(new ResetPasswordLinkEmail($token));

    return response()->json(['message' => 'Письмо со ссылкой для сброса пароля успешно отправлено!']);

    // $status = Password::sendResetLink(
    //   $request->only('email')
    // );

    // Mail::to('recipient@example.com')->send(new ResetPasswordLinkEmail($data));

    // return $status === Password::RESET_LINK_SENT
    //   ? response()->json(['message' => 'Reset link sent.'])
    //   : response()->json(['message' => 'Unable to send reset link.'], 400);
  }
}
