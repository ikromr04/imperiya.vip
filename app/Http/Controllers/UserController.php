<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\Admin;
use App\Models\Director;
use App\Models\Grade;
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
  public function index(Request $request): JsonResponse
  {
    $user = $request->user();

    $users = [];

    switch ($user->role) {
      case 'superadmin':
        $users = User::selectBasic()->get();
        break;

      case 'student':
        $users = User::selectForStudents()->get();
        break;

      case 'parent':
        $childIds = Student::where('mother_id', $user->id)
          ->orWhere('father_id', $user->id)
          ->pluck('user_id');

        $users = [
          ...User::selectForStudents()->get(),
          ...User::selectBasic()->whereIn('id', $childIds)->get(),
        ];
        break;
    }

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
      'phone_numbers',
      'whatsapp',
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

        if ($request->has('teacher.grades')) {
          $gradeIds = $request->input('teacher.grades');

          Grade::whereIn('id', $gradeIds)->update(['teacher_id' => $user->id]);
        }
        break;

      case 'parent':
        Guardian::create([
          'user_id' => $user->id,
          'profession_id' => $request->input('parent.profession_id'),
          'workplace' => $request->input('parent.workplace'),
          'position' => $request->input('parent.position'),
        ]);

        if ($request->has('parent.children')) {
          if ($user->sex === 'male') {
            Student::whereIn('id', $request->input('parent.children'))
              ->update(['father_id' => $user->id]);
          }
          if ($user->sex === 'female') {
            Student::whereIn('id', $request->input('parent.children'))
              ->update(['mother_id' => $user->id]);
          }
        }
        break;

      case 'student':
        Student::create([
          'user_id' => $user->id,
          'grade_id' => $request->input('student.grade_id'),
          'mother_id' => $request->input('student.mother_id'),
          'father_id' => $request->input('student.father_id'),
          'admission_date' => $request->input('student.admission_date'),
          'previous_schools' => $request->input('student.previous_schools'),
          'medical_recommendations' => $request->input('student.medical_recommendations'),
        ]);

        if ($request->has('parent.children')) {
          if ($user->sex === 'male') {
            Student::whereIn('id', $request->input('parent.children'))->update('father_id', $user->id);
          }
          if ($user->sex === 'female') {
            Student::whereIn('id', $request->input('parent.children'))->update('mother_id', $user->id);
          }
        }
        break;
    }

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
      'blocked_at',
    ]));

    return response()->json(User::selectBasic()->find($user->id), 200);
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

  public function student(Request $request): JsonResponse
  {
    $user = $request->user();

    $student = Student::select(
      'id',
      'user_id',
      'grade_id',
      'mother_id',
      'father_id',
    )
      ->where('user_id', $user->id)
      ->with([
        'mother' => fn($query) => $query->select(
          'id',
          'name',
          'surname',
          'patronymic',
        ),
        'father' => fn($query) => $query->select(
          'id',
          'name',
          'surname',
          'patronymic',
        ),
        'grade' => fn($query) => $query->select(
          'id',
          'level',
          'group',
        ),
      ])
      ->first();

    return response()->json([
      'mother' => $student->mother,
      'father' => $student->father,
      'grade' => $student->grade,
    ], 200);
  }
}
