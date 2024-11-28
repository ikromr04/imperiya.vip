<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\PasswordResetEmailRequest;
use App\Http\Requests\PasswordResetRequest;
use App\Mail\LoginCredentialsEmail;
use App\Mail\PasswordResetEmail;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class AuthController extends Controller
{
  public function check(Request $request): JsonResponse
  {
    $user = $request->user();

    if (!$user) return response()->json(['message' => 'Вы не авторизованы.'], 401);

    return response()->json([
      'id' => $user->id,
      'name' => $user->name,
      'email' => $user->email,
      ...($user->avatar ? ['avatar' => $user->avatar] : []),
    ], 200);
  }

  public function login(LoginRequest $request): JsonResponse
  {
    $user = User::where('email', $request->email)->first();

    return response()->json([
      'user' => [
        'id' => $user->id,
        'name' => $user->name,
        'email' => $user->email,
        ...($user->avatar ? ['avatar' => $user->avatar] : []),
      ],
      'token' => $user->createToken('access_token')->plainTextToken,
    ], 200);
  }

  public function sendPasswordResetEmail(PasswordResetEmailRequest $request): JsonResponse
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
      Mail::to($request->email)->send(new PasswordResetEmail($token));

      return response()->json(['message' => 'Письмо со ссылкой для сброса пароля успешно отправлено!'], 200);
    } catch (\Throwable $th) {
      Log::error('Error sending password reset email: ' . $th->getMessage(), [
        'exception' => $th,
        'email' => $request->email,
      ]);

      return response()->json(['message' => 'Не удалось отправить письмо. Пожалуйста, попробуйте снова позже.'], 500);
    }
  }

  public function resetPassword(PasswordResetRequest $request): JsonResponse
  {
    $resetRecord = DB::table('password_reset_tokens')->where('token', $request->token)->first();

    if (!$resetRecord || !Carbon::parse($resetRecord->created_at)->addMinutes(config('auth.passwords.' . config('auth.defaults.passwords') . '.expire'))->isFuture())
      return response()->json(['message' => 'Сброс не удался. Недействительный или просроченный токен.'], 500);

    $user = User::where('email', $resetRecord->email)->first();
    $user->password = Hash::make($request->password);
    $user->save();

    DB::table('password_reset_tokens')->where('token', $request->token)->delete();

    if ($request->email)
      Mail::to($user->email)->send(new LoginCredentialsEmail([
        'email' => $user->email,
        'password' => $request->password,
      ]));

    return response()->json(['message' => 'Пароль успешно обновлен.'], 200);
  }

  public function logout(): JsonResponse
  {
    $user = request()->user();

    if (!$user) return response()->json(['message' => 'Вы не авторизованы.'], 401);

    $user->currentAccessToken()->delete();

    return response()->json(['message' => 'Вы успешно вышли из системы.'], 200);
  }
}
