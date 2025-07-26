<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRoleUpdateRequest;
use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\Admin;
use App\Models\Director;
use App\Models\Grade;
use App\Models\Guardian;
use App\Models\Lesson;
use App\Models\Rating;
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
  public function index(Request $request): JsonResponse
  {
    $user = $request->user();
    $users = collect();

    switch ($user->role) {
      case 'superadmin':
        $users = User::select(['id', 'name', 'surname', 'patronymic', 'login', 'password', 'role', 'sex', 'birth_date', 'nationality_id', 'email', 'address', 'phone_numbers', 'whatsapp', 'social_link', 'avatar', 'avatar_thumb', 'blocked_at', 'created_at'])
          ->orderBy('surname')
          ->with([
            'teacher:id,user_id,education,achievements,work_experience',
            'parent:id,user_id,profession_id,workplace,position',
            'student:id,user_id,grade_id,mother_id,father_id,admission_date,previous_schools,medical_recommendations,talents'
          ])->get();
        break;

      case 'teacher':
        $users = User::whereIn('role', ['student', 'parent', 'teacher'])
          ->select(['id', 'name', 'surname', 'patronymic', 'role', 'sex', 'email', 'avatar', 'avatar_thumb', 'birth_date', 'address', 'whatsapp', 'nationality_id', 'social_link', 'phone_numbers'])
          ->orderBy('surname')
          ->with(['student:id,user_id,grade_id,mother_id,father_id,admission_date,previous_schools,medical_recommendations,talents'])->get();
        break;

      case 'parent':
        $childIds = Student::where('mother_id', $user->id)
          ->orWhere('father_id', $user->id)
          ->pluck('user_id');

        $users = [
          ...User::select(['id', 'name', 'surname', 'patronymic', 'role', 'sex', 'birth_date', 'nationality_id', 'email', 'address', 'phone_numbers', 'whatsapp', 'social_link', 'avatar', 'avatar_thumb'])
            ->where('role', 'teacher')
            ->get(),
          ...User::select(['id', 'name', 'surname', 'patronymic', 'login', 'password', 'role', 'sex', 'birth_date', 'nationality_id', 'email', 'address', 'phone_numbers', 'whatsapp', 'social_link', 'avatar', 'avatar_thumb', 'blocked_at', 'created_at'])
            ->with([
              'student:id,user_id,grade_id,mother_id,father_id,admission_date,previous_schools,medical_recommendations,talents',
              'parent:id,user_id,profession_id,workplace,position'
            ])
            ->whereIn('id', $childIds)
            ->get(),
        ];
        break;

      case 'student':
        $student = Student::where('user_id', $user->id)->first();
        $classmateIds = Student::where('grade_id', $student->grade_id)->pluck('user_id');

        $users = [
          ...User::select(['id', 'name', 'surname', 'patronymic', 'role', 'sex', 'birth_date', 'nationality_id', 'email', 'address', 'phone_numbers', 'whatsapp', 'social_link', 'avatar', 'avatar_thumb'])
            ->where('role', 'teacher')
            ->orWhere('id', $student->father_id)
            ->orWhere('id', $student->mother_id)
            ->get(),
          ...User::select(['id', 'name', 'surname', 'patronymic', 'role', 'sex', 'birth_date', 'nationality_id', 'email', 'address', 'phone_numbers', 'whatsapp', 'social_link', 'avatar', 'avatar_thumb'])
            ->whereIn('id', $classmateIds)
            ->with(['student:id,user_id,grade_id,mother_id,father_id,admission_date,previous_schools,medical_recommendations,talents'])
            ->get()
        ];
        break;
    }

    return response()->json($users, 200);
  }

  public function store(UserStoreRequest $request): JsonResponse
  {
    $user = User::create($request->only(['name', 'surname', 'patronymic', 'role', 'sex', 'birth_date', 'nationality_id', 'email', 'address', 'phone_numbers', 'whatsapp']));

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
          'talents' => $request->input('student.talents'),
        ]);

        if ($request->has('parent.children')) {
          if ($user->sex === 'male') {
            Student::whereIn('id', $request->input('parent.children'))
              ->update('father_id', $user->id);
          }
          if ($user->sex === 'female') {
            Student::whereIn('id', $request->input('parent.children'))
              ->update('mother_id', $user->id);
          }
        }
        break;
    }

    $user = User::select(['id', 'name', 'surname', 'patronymic', 'login', 'password', 'role', 'sex', 'birth_date', 'nationality_id', 'email', 'address', 'phone_numbers', 'whatsapp', 'social_link', 'avatar', 'avatar_thumb', 'blocked_at', 'created_at'])
      ->with([
        'teacher:id,user_id,education,achievements,work_experience',
        'parent:id,user_id,profession_id,workplace,position',
        'student:id,user_id,grade_id,mother_id,father_id,admission_date,previous_schools,medical_recommendations,talents'
      ])->find($user->id);

    return response()->json($user, 201);
  }

  public function update(UserUpdateRequest $request, int $id): JsonResponse
  {
    $user = User::findOrFail($id);

    if ($user->login !== $request->login && User::where('login', $request->login)->exists()) {
      throw ValidationException::withMessages(['login' => ['Пользователь с таким логином уже существует.']]);
    }
    $user->update($request->only(['name', 'surname', 'patronymic', 'login', 'sex', 'birth_date', 'nationality_id', 'email', 'address', 'social_link', 'phone_numbers', 'whatsapp', 'blocked_at']));

    if ($request->password) {
      $user->password = Crypt::encryptString($request->password);
    }
    $user->save();

    $user = User::select(['id', 'name', 'surname', 'patronymic', 'login', 'password', 'role', 'sex', 'birth_date', 'nationality_id', 'email', 'address', 'phone_numbers', 'whatsapp', 'social_link', 'avatar', 'avatar_thumb', 'blocked_at', 'created_at'])
      ->with([
        'teacher:id,user_id,education,achievements,work_experience',
        'parent:id,user_id,profession_id,workplace,position',
        'student:id,user_id,grade_id,mother_id,father_id,admission_date,previous_schools,medical_recommendations,talents'
      ])->find($user->id);

    return response()->json($user, 200);
  }

  public function delete(Request $request)
  {
    $user = User::findOrFail($request->id);
    $user->update(['reason_id' => $request->query('reason_id')]);
    $user->delete();

    return response()->json($request->query('reason_id'));
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

    $user = User::select(['id', 'name', 'surname', 'patronymic', 'login', 'password', 'role', 'sex', 'birth_date', 'nationality_id', 'email', 'address', 'phone_numbers', 'whatsapp', 'social_link', 'avatar', 'avatar_thumb', 'blocked_at', 'created_at'])
      ->with([
        'teacher:id,user_id,education,achievements,work_experience',
        'parent:id,user_id,profession_id,workplace,position',
        'student:id,user_id,grade_id,mother_id,father_id,admission_date,previous_schools,medical_recommendations,talents'
      ])->find($user->id);

    return response()->json($user, 200);
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

  public function updateRole(UserRoleUpdateRequest $request, int $id): JsonResponse
  {
    $user = User::findOrFail($id);

    switch ($user->role) {
      case 'teacher':
        if ($request->has('grades')) {
          Grade::where('teacher_id', $user->id)
            ->update(['teacher_id' => null]);
          Grade::whereIn('id', $request->input('grades'))
            ->update(['teacher_id' => $user->id]);
        }
        $user->teacher->update($request->only(['education', 'achievements', 'work_experience']));
        break;

      case 'parent':
        if ($request->has('children')) {
          if ($user->sex === 'male') {
            Student::where('father_id', $user->id)
              ->update(['father_id' => null]);
            Student::whereIn('user_id', $request->input('children'))
              ->update(['father_id' => $user->id]);
          }
          if ($user->sex === 'female') {
            Student::where('mother_id', $user->id)
              ->update(['mother_id' => null]);
            Student::whereIn('user_id', $request->input('children'))
              ->update(['mother_id' => $user->id]);
          }

          $user->parent->update($request->only(['profession_id', 'workplace', 'position']));
        }
        break;

      case 'student':
        $user->student->update($request->only(['grade_id', 'mother_id', 'father_id', 'admission_date', 'previous_schools', 'medical_recommendations', 'talents']));
        break;
    }

    $users = User::select(['id', 'name', 'surname', 'patronymic', 'login', 'password', 'role', 'sex', 'birth_date', 'nationality_id', 'email', 'address', 'phone_numbers', 'whatsapp', 'social_link', 'avatar', 'avatar_thumb', 'blocked_at', 'created_at'])
      ->with([
        'teacher:id,user_id,education,achievements,work_experience',
        'parent:id,user_id,profession_id,workplace,position',
        'student:id,user_id,grade_id,mother_id,father_id,admission_date,previous_schools,medical_recommendations,talents'
      ])->get();

    return response()->json($users, 200);
  }

  public function getRatings(Request $request): JsonResponse
  {
    $authUser = $request->user();
    $subjectIds = collect();
    $ratings = collect();

    switch ($authUser->role) {
      case 'superadmin':
      case 'student':
        $user = User::find($request->id);

        $subjectIds = Lesson::where('grade_id', $user->student->grade_id)
          ->distinct()
          ->pluck('subject_id');

        $ratings = Rating::where('years', $request->query('years'))
          ->where('student_id', $user->id)
          ->where('grade_id', $user->student->grade_id)
          ->get();
        break;

      case 'parent':
        $user = User::find($request->id);

        if (!$user->blocked_at) {
          $subjectIds = Lesson::where('grade_id', $user->student->grade_id)
            ->distinct()
            ->pluck('subject_id');

          $ratings = Rating::where('years', $request->query('years'))
            ->where('student_id', $user->id)
            ->where('grade_id', $user->student->grade_id)
            ->get();
        }

        break;
    }


    return response()->json([
      'subjectIds' => $subjectIds,
      'ratings' => $ratings,
    ], 200);
  }
}
