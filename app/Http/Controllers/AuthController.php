<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\PasswordResetEmailRequest;
use App\Http\Requests\PasswordResetRequest;
use App\Http\Requests\RegisterRequest;
use App\Mail\LoginCredentialsEmail;
use App\Mail\PasswordResetEmail;
use App\Models\Guardian;
use App\Models\RegisterLink;
use App\Models\Student;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
  public function check(Request $request): JsonResponse
  {
    $user = $request->user();

    if (!$user) return response()->json(['message' => 'Вы не авторизованы.'], 401);

    $user = User::select(['id', 'name', 'surname', 'patronymic', 'login', 'password', 'role', 'sex', 'birth_date', 'nationality_id', 'email', 'address', 'phone_numbers', 'whatsapp', 'social_link', 'avatar', 'avatar_thumb', 'blocked_at', 'created_at'])
      ->with([
        'teacher:id,user_id,education,achievements,work_experience',
        'parent:id,user_id,profession_id,workplace,position',
        'student:id,user_id,grade_id,mother_id,father_id,admission_date,previous_schools,medical_recommendations'
      ])->findOrFail($user->id);

    return response()->json($user, 200);
  }

  public function register(RegisterRequest $request): JsonResponse
  {
    $link = RegisterLink::where('token', $request->token)->first();

    if (!$link || Carbon::parse($link->expires_at)->isPast()) {
      throw ValidationException::withMessages([
        'token' => 'Срок действия вашей ссылки истек.',
      ]);
    }

    $father = null;
    $mother = null;

    foreach ($request->parents as $parent) {
      $user = User::create([
        'name' => $parent['name'],
        'surname' => $parent['surname'],
        'patronymic' => $parent['patronymic'] ?? null,
        'birth_date' => $parent['birth_date'],
        'sex' => $parent['sex'],
        'nationality_id' => $parent['nationality_id'],
        'role' => 'parent',
        'phone_numbers' => [$parent['tel']],
        'whatsapp' => $parent['whatsapp'],
        'address' => $parent['address'],
        'email' => $parent['email'] ?? null,
      ]);

      Guardian::create([
        'user_id' => $user->id,
        'profession_id' => $parent['profession_id'],
        'workplace' => $parent['workplace'],
        'position' => $parent['position'],
      ]);

      if ($user->sex === 'male') {
        $father = $user;
      }

      if ($user->sex === 'female') {
        $mother = $user;
      }
    }

    foreach ($request->children as $child) {
      $user = User::create([
        'name' => $child['name'],
        'surname' => $child['surname'],
        'patronymic' => $child['patronymic'] ?? null,
        'birth_date' => $child['birth_date'],
        'sex' => $child['sex'],
        'nationality_id' => $child['nationality_id'],
        'role' => 'student',
        'address' => $request->parents[0]['address'],
      ]);

      Student::create([
        'user_id' => $user->id,
        'grade_id' => $child['grade_id'],
        'mother_id' => $mother->id ?? null,
        'father_id' => $father->id ?? null,
        'admission_date' => Carbon::now(),
        'previous_schools' => $child['previous_schools'],
        'medical_recommendations' => $child['medical_recommendations'],
      ]);
    }

    return response()->json();
  }

  public function login(LoginRequest $request): JsonResponse
  {
    $user = User::where('login', $request->login)->first();

    if ($request->password != Crypt::decryptString($user->password)) {
      throw ValidationException::withMessages([
        'password' => ['Неверный пароль.'],
      ]);
    }

    $user = User::select(['id', 'name', 'surname', 'patronymic', 'login', 'password', 'role', 'sex', 'birth_date', 'nationality_id', 'email', 'address', 'phone_numbers', 'whatsapp', 'social_link', 'avatar', 'avatar_thumb', 'blocked_at', 'created_at'])
      ->with([
        'teacher:id,user_id,education,achievements,work_experience',
        'parent:id,user_id,profession_id,workplace,position',
        'student:id,user_id,grade_id,mother_id,father_id,admission_date,previous_schools,medical_recommendations'
      ])->findOrFail($user->id);

    return response()->json([
      'user' => $user,
      'token' => $user->createToken('access_token', [$user->role])->plainTextToken,
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
      return response()->json(['message' => 'Сброс не удался. Недействительный или просроченный токен.'], 423);

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

  public function getRegisterLinks(): JsonResponse
  {
    $links = RegisterLink::orderBy('expires_at', 'desc')
      ->selectBasic()
      ->get();

    return response()->json($links, 200);
  }

  public function generateRegisterLink(): JsonResponse
  {
    $link = RegisterLink::create([
      'token' => Str::random(32),
      'expires_at' => Carbon::now()->addHour(12),
    ]);

    return response()->json(RegisterLink::selectBasic()->find($link->id), 200);
  }

  public function checkRegisterLink(Request $request)
  {
    $link = RegisterLink::selectBasic()->where('token', $request->token)->first();

    if (!$link) {
      throw ValidationException::withMessages([
        'message' => 'Недействительный токен.',
      ]);
    }

    return response()->json($link, 200);
  }

  public function updateRegisterLink(int $id): JsonResponse
  {
    RegisterLink::findOrFail($id)->update([
      'expires_at' => Carbon::now()->addHour(12),
    ]);

    return response()->json(RegisterLink::selectBasic()->find($id), 200);
  }

  public function deleteRegisterLink(int $id)
  {
    RegisterLink::findOrFail($id)->delete();

    return response()->noContent();
  }
}
