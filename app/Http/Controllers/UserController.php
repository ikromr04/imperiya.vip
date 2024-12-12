<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;

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
    }

    return response()->json($users, 200);
  }
}
