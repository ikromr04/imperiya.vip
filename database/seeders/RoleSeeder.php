<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
  public function run(): void
  {
    $roles = [
      [
        'name' => 'Супер-администратор',
        'slug' => 'super-admin',
      ],
      [
        'name' => 'Администратор',
        'slug' => 'admin',
      ],
      [
        'name' => 'Директор',
        'slug' => 'director',
      ],
      [
        'name' => 'Педагог',
        'slug' => 'teacher',
      ],
      [
        'name' => 'Ученик',
        'slug' => 'student',
      ],
      [
        'name' => 'Родитель',
        'slug' => 'parent',
      ],
    ];

    foreach ($roles as $role) {
      Role::create([
        'name' => $role['name'],
        'slug' => $role['slug'],
      ]);
    }
  }
}
