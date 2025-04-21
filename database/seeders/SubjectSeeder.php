<?php

namespace Database\Seeders;

use App\Models\Subject;
use Illuminate\Database\Seeder;

class SubjectSeeder extends Seeder
{
  public function run(): void
  {
    $subjects = array(
      array('id' => '1', 'name' => 'Русский язык', 'created_at' => '2025-04-16 01:53:55', 'updated_at' => '2025-04-16 01:53:55', 'deleted_at' => NULL),
      array('id' => '2', 'name' => 'Литературное чтение', 'created_at' => '2025-04-16 01:54:14', 'updated_at' => '2025-04-16 01:54:14', 'deleted_at' => NULL),
      array('id' => '3', 'name' => 'Ментальная арифметика', 'created_at' => '2025-04-16 01:54:27', 'updated_at' => '2025-04-16 01:54:27', 'deleted_at' => NULL),
      array('id' => '4', 'name' => 'Актёрское мастерство', 'created_at' => '2025-04-16 01:54:35', 'updated_at' => '2025-04-16 01:54:35', 'deleted_at' => NULL),
      array('id' => '5', 'name' => 'Happy English', 'created_at' => '2025-04-16 01:54:43', 'updated_at' => '2025-04-16 01:54:43', 'deleted_at' => NULL),
      array('id' => '6', 'name' => 'IT-технология', 'created_at' => '2025-04-16 01:54:51', 'updated_at' => '2025-04-16 01:54:51', 'deleted_at' => NULL),
      array('id' => '7', 'name' => 'Математика', 'created_at' => '2025-04-16 01:55:01', 'updated_at' => '2025-04-16 01:55:01', 'deleted_at' => NULL),
      array('id' => '8', 'name' => 'Китайский язык', 'created_at' => '2025-04-16 01:55:10', 'updated_at' => '2025-04-16 01:55:10', 'deleted_at' => NULL),
      array('id' => '9', 'name' => 'Государственный язык', 'created_at' => '2025-04-16 01:55:28', 'updated_at' => '2025-04-16 01:55:28', 'deleted_at' => NULL),
      array('id' => '10', 'name' => 'Спорт', 'created_at' => '2025-04-16 01:55:38', 'updated_at' => '2025-04-16 01:55:38', 'deleted_at' => NULL),
      array('id' => '11', 'name' => 'Логическое мышление', 'created_at' => '2025-04-16 01:55:48', 'updated_at' => '2025-04-16 01:55:48', 'deleted_at' => NULL),
      array('id' => '12', 'name' => 'Творчество', 'created_at' => '2025-04-16 01:55:55', 'updated_at' => '2025-04-16 01:55:55', 'deleted_at' => NULL),
      array('id' => '13', 'name' => 'Рисование', 'created_at' => '2025-04-16 01:56:04', 'updated_at' => '2025-04-16 01:56:04', 'deleted_at' => NULL),
      array('id' => '14', 'name' => 'Окружающий мир', 'created_at' => '2025-04-16 01:56:10', 'updated_at' => '2025-04-16 01:56:10', 'deleted_at' => NULL),
      array('id' => '15', 'name' => 'Урок счастья', 'created_at' => '2025-04-16 01:56:16', 'updated_at' => '2025-04-16 01:56:16', 'deleted_at' => NULL),
      array('id' => '16', 'name' => 'Школа ораторского мастерства', 'created_at' => '2025-04-16 01:56:29', 'updated_at' => '2025-04-16 01:56:29', 'deleted_at' => NULL),
      array('id' => '17', 'name' => 'Воспитательный час', 'created_at' => '2025-04-16 01:56:37', 'updated_at' => '2025-04-16 01:56:37', 'deleted_at' => NULL),
      array('id' => '18', 'name' => 'Биология', 'created_at' => '2025-04-16 01:56:57', 'updated_at' => '2025-04-16 01:56:57', 'deleted_at' => NULL),
      array('id' => '19', 'name' => 'История таджикского народа', 'created_at' => '2025-04-16 01:57:04', 'updated_at' => '2025-04-16 01:57:04', 'deleted_at' => NULL),
      array('id' => '20', 'name' => 'Школа этикета', 'created_at' => '2025-04-16 01:57:14', 'updated_at' => '2025-04-16 01:57:14', 'deleted_at' => NULL),
      array('id' => '21', 'name' => 'География', 'created_at' => '2025-04-16 01:57:31', 'updated_at' => '2025-04-16 01:57:31', 'deleted_at' => NULL),
      array('id' => '22', 'name' => 'Школа бизнеса', 'created_at' => '2025-04-16 01:57:37', 'updated_at' => '2025-04-16 01:57:37', 'deleted_at' => NULL),
      array('id' => '23', 'name' => 'Литература', 'created_at' => '2025-04-16 01:57:45', 'updated_at' => '2025-04-16 01:57:45', 'deleted_at' => NULL),
      array('id' => '24', 'name' => 'Креативное мышление', 'created_at' => '2025-04-16 01:58:04', 'updated_at' => '2025-04-16 01:58:04', 'deleted_at' => NULL),
      array('id' => '25', 'name' => 'Общая история', 'created_at' => '2025-04-16 01:58:19', 'updated_at' => '2025-04-16 01:58:19', 'deleted_at' => NULL),
      array('id' => '26', 'name' => 'Технология', 'created_at' => '2025-04-16 01:58:34', 'updated_at' => '2025-04-16 01:58:34', 'deleted_at' => NULL),
      array('id' => '27', 'name' => 'Медиаграмотность', 'created_at' => '2025-04-16 15:46:47', 'updated_at' => '2025-04-16 15:46:47', 'deleted_at' => NULL),
      array('id' => '28', 'name' => 'Проект', 'created_at' => '2025-04-16 16:04:48', 'updated_at' => '2025-04-16 16:04:48', 'deleted_at' => NULL),
      array('id' => '29', 'name' => 'Продленка', 'created_at' => '2025-04-16 16:18:24', 'updated_at' => '2025-04-16 16:18:24', 'deleted_at' => NULL)
    );


    foreach ($subjects as $subject) {
      Subject::create([
        'name' => $subject['name'],
        'created_at' => $subject['created_at'],
        'updated_at' => $subject['updated_at'],
      ]);
    }
  }
}
