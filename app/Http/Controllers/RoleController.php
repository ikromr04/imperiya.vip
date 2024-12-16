<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\JsonResponse;

class RoleController extends Controller
{
  public function index(): JsonResponse
  {
    $roles = Role::orderBy('name')->select('id', 'slug', 'name')->get();

    return response()->json($roles, 200);
  }
}
