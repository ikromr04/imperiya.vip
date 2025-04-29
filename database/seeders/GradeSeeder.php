<?php

namespace Database\Seeders;

use App\Models\Grade;
use Illuminate\Database\Seeder;

class GradeSeeder extends Seeder
{
  public function run(): void
  {
    $grades = array(
      array('id' => '1', 'level' => '1', 'teacher_id' => null, 'group' => 'А', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-16 01:19:11', 'deleted_at' => NULL),
      array('id' => '2', 'level' => '1', 'teacher_id' => null, 'group' => 'Б', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-16 01:04:45', 'deleted_at' => NULL),
      array('id' => '3', 'level' => '2', 'teacher_id' => null, 'group' => 'А', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-16 01:04:45', 'deleted_at' => NULL),
      array('id' => '4', 'level' => '2', 'teacher_id' => null, 'group' => 'Б', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-16 01:04:45', 'deleted_at' => NULL),
      array('id' => '5', 'level' => '3', 'teacher_id' => null, 'group' => 'А', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-16 01:04:45', 'deleted_at' => NULL),
      array('id' => '6', 'level' => '3', 'teacher_id' => null, 'group' => 'Б', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-16 01:04:45', 'deleted_at' => NULL),
      array('id' => '7', 'level' => '4', 'teacher_id' => null, 'group' => 'А', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-16 01:04:45', 'deleted_at' => NULL),
      array('id' => '8', 'level' => '4', 'teacher_id' => null, 'group' => 'Б', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-16 01:04:45', 'deleted_at' => NULL),
      array('id' => '9', 'level' => '5', 'teacher_id' => null, 'group' => 'А', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-16 01:04:45', 'deleted_at' => NULL),
      array('id' => '10', 'level' => '5', 'teacher_id' => null, 'group' => 'Б', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-16 01:04:45', 'deleted_at' => NULL)
    );

    Grade::insert($grades);
  }
}
