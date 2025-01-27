<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserStoreRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

class UserController extends Controller
{
  public function index(): JsonResponse
  {
    $users = User::orderBy('name')
      ->select(
        'id',
        'name',
        'login',
        'email',
        'avatar',
        'avatar_thumb as avatarThumb',
        'birth_date as birthDate',
        'address',
        'facebook',
        'instagram',
        'telegram',
        'odnoklassniki',
        'role_id',
        'gender_id',
        'grade_id',
        'nationality_id',
      )->with([
        'role' => function ($query) {
          $query->select(
            'id',
            'name',
            'slug'
          );
        },
        'gender' => function ($query) {
          $query->select(
            'id',
            'name',
          );
        },
        'grade' => function ($query) {
          $query->select(
            'id',
            'level',
            'group',
          );
        },
        'nationality' => function ($query) {
          $query->select(
            'id',
            'name',
          );
        },
        'phones' => function ($query) {
          $query->select(
            'id',
            'user_id',
            'numbers',
            'dial_code as dialCode',
          );
        },
      ])->get();

    foreach ($users as $user) {
      $user->avatar && $user->avatar = asset($user->avatar);
      $user->avatarThumb && $user->avatarThumb = asset($user->avatarThumb);

      if (!$user->avatar) {
        unset($user->avatar);
        unset($user->avatarThumb);
      }

      unset($user->role_id);
      unset($user->gender_id);
      unset($user->grade_id);
      unset($user->nationality_id);

      if (!$user->email) unset($user->email);
      if (!$user->birthDate) unset($user->birthDate);
      if (!$user->address) unset($user->address);
      if (!$user->facebook) unset($user->facebook);
      if (!$user->instagram) unset($user->instagram);
      if (!$user->telegram) unset($user->telegram);
      if (!$user->odnoklassniki) unset($user->odnoklassniki);
      if (!$user->gender) unset($user->gender);
      if (!$user->role) unset($user->role);
      if (!$user->grade) unset($user->grade);
      if (!$user->nationality) unset($user->nationality);

      if (count($user->phones) < 1) {
        unset($user->phones);
      } else {
        foreach ($user->phones as $key => $value) unset($user->phones[$key]->user_id);
      };
    }

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
      'role_id' => $request->role_id,
      'gender_id' => $request->gender_id ? $request->gender_id : null,
      'grade_id' => $request->grade_id ? $request->grade_id : null,
      'nationality_id' => $request->nationality_id ? $request->nationality_id : null,
    ]);

    $user = User::orderBy('name')
      ->select(
        'id',
        'name',
        'login',
        'email',
        'avatar',
        'avatar_thumb as avatarThumb',
        'birth_date as birthDate',
        'address',
        'facebook',
        'instagram',
        'telegram',
        'odnoklassniki',
        'role_id',
        'gender_id',
        'grade_id',
        'nationality_id',
      )->with([
        'role' => function ($query) {
          $query->select(
            'id',
            'name',
            'slug'
          );
        },
        'gender' => function ($query) {
          $query->select(
            'id',
            'name',
          );
        },
        'grade' => function ($query) {
          $query->select(
            'id',
            'level',
            'group',
          );
        },
        'nationality' => function ($query) {
          $query->select(
            'id',
            'name',
          );
        },
        'phones' => function ($query) {
          $query->select(
            'id',
            'user_id',
            'numbers',
            'dial_code as dialCode',
          );
        },
      ])->find($user->id);


    return response()->json($user, 200);
  }

  public function show(int $userId): JsonResponse
  {
    $user = User::select(
      'id',
      'name',
      'login',
      'email',
      'avatar',
      'avatar_thumb as avatarThumb',
      'birth_date as birthDate',
      'address',
      'facebook',
      'instagram',
      'telegram',
      'odnoklassniki',
      'role_id',
      'gender_id',
      'grade_id',
      'nationality_id',
    )->with([
      'role' => function ($query) {
        $query->select(
          'id',
          'name',
          'slug'
        );
      },
      'gender' => function ($query) {
        $query->select(
          'id',
          'name',
        );
      },
      'grade' => function ($query) {
        $query->select(
          'id',
          'level',
          'group',
        );
      },
      'nationality' => function ($query) {
        $query->select(
          'id',
          'name',
        );
      },
      'phones' => function ($query) {
        $query->select(
          'id',
          'user_id',
          'numbers',
          'dial_code as dialCode',
        );
      },
    ])->find($userId);

    return response()->json($user, 200);
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

    $user = User::select(
      'id',
      'name',
      'login',
      'email',
      'avatar',
      'avatar_thumb as avatarThumb',
      'birth_date as birthDate',
      'address',
      'facebook',
      'instagram',
      'telegram',
      'odnoklassniki',
      'role_id',
      'gender_id',
      'grade_id',
      'nationality_id',
    )->with([
      'role' => function ($query) {
        $query->select(
          'id',
          'name',
          'slug'
        );
      },
      'gender' => function ($query) {
        $query->select(
          'id',
          'name',
        );
      },
      'grade' => function ($query) {
        $query->select(
          'id',
          'level',
          'group',
        );
      },
      'nationality' => function ($query) {
        $query->select(
          'id',
          'name',
        );
      },
      'phones' => function ($query) {
        $query->select(
          'id',
          'user_id',
          'numbers',
          'dial_code as dialCode',
        );
      },
    ])->find($userId);

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
