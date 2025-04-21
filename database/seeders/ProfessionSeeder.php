<?php

namespace Database\Seeders;

use App\Models\Profession;
use Illuminate\Database\Seeder;

class ProfessionSeeder extends Seeder
{
  public function run(): void
  {
    // $professions = array(
    //   array('id' => '1', 'name' => 'Образование', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-08 23:09:48', 'deleted_at' => NULL),
    //   array('id' => '2', 'name' => 'Медицина и фармацевтика', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-08 23:09:48', 'deleted_at' => NULL),
    //   array('id' => '3', 'name' => 'Культура', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-08 23:09:48', 'deleted_at' => NULL),
    //   array('id' => '4', 'name' => 'Государственные органы власти', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-08 23:09:48', 'deleted_at' => NULL),
    //   array('id' => '5', 'name' => 'Бизнес', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-08 23:09:48', 'deleted_at' => NULL),
    //   array('id' => '6', 'name' => 'Торговля', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-08 23:09:48', 'deleted_at' => NULL),
    //   array('id' => '7', 'name' => 'Транспорт', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-08 23:09:48', 'deleted_at' => NULL),
    //   array('id' => '8', 'name' => 'Финансы', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-08 23:09:48', 'deleted_at' => NULL),
    //   array('id' => '9', 'name' => 'Красота и здоровье', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-08 23:09:48', 'deleted_at' => NULL),
    //   array('id' => '10', 'name' => 'Спорт', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-08 23:09:48', 'deleted_at' => NULL),
    //   array('id' => '11', 'name' => 'Строительство', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-08 23:09:48', 'deleted_at' => NULL),
    //   array('id' => '12', 'name' => 'Фермерство', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-08 23:09:48', 'deleted_at' => NULL),
    //   array('id' => '13', 'name' => 'Международная организация', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-08 23:09:48', 'deleted_at' => NULL),
    //   array('id' => '14', 'name' => 'Блогер', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-08 23:09:48', 'deleted_at' => NULL),
    //   array('id' => '15', 'name' => 'Дизайн', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-08 23:09:48', 'deleted_at' => NULL),
    //   array('id' => '16', 'name' => 'IT', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-08 23:09:48', 'deleted_at' => NULL),
    //   array('id' => '17', 'name' => 'Временно не работает', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-08 23:09:48', 'deleted_at' => NULL)
    // );

    $professions = array(
      array('id' => '1', 'name' => 'Образование', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-08 23:09:48', 'deleted_at' => NULL),
      array('id' => '2', 'name' => 'Медицина и фармацевтика', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-08 23:09:48', 'deleted_at' => NULL),
      array('id' => '3', 'name' => 'Культура', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-08 23:09:48', 'deleted_at' => NULL),
      array('id' => '4', 'name' => 'Государственные органы власти', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-08 23:09:48', 'deleted_at' => NULL),
      array('id' => '5', 'name' => 'Бизнес', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-08 23:09:48', 'deleted_at' => NULL),
      array('id' => '6', 'name' => 'Торговля', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-08 23:09:48', 'deleted_at' => NULL),
      array('id' => '7', 'name' => 'Транспорт', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-08 23:09:48', 'deleted_at' => NULL),
      array('id' => '8', 'name' => 'Финансы', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-08 23:09:48', 'deleted_at' => NULL),
      array('id' => '9', 'name' => 'Красота и здоровье', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-08 23:09:48', 'deleted_at' => NULL),
      array('id' => '10', 'name' => 'Спорт', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-08 23:09:48', 'deleted_at' => NULL),
      array('id' => '11', 'name' => 'Строительство', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-08 23:09:48', 'deleted_at' => NULL),
      array('id' => '12', 'name' => 'Фермерство', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-08 23:09:48', 'deleted_at' => NULL),
      array('id' => '13', 'name' => 'Международная организация', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-08 23:09:48', 'deleted_at' => NULL),
      array('id' => '14', 'name' => 'Блогер', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-08 23:09:48', 'deleted_at' => NULL),
      array('id' => '15', 'name' => 'Дизайн', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-08 23:09:48', 'deleted_at' => NULL),
      array('id' => '16', 'name' => 'IT', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-08 23:09:48', 'deleted_at' => NULL),
      array('id' => '17', 'name' => 'Временно не работает', 'created_at' => '2025-04-08 23:09:48', 'updated_at' => '2025-04-08 23:09:48', 'deleted_at' => NULL)
    );

    foreach ($professions as $profession) {
      Profession::create([
        'id' => $profession['id'],
        'name' => $profession['name'],
        'created_at' => $profession['created_at'],
        'updated_at' => $profession['updated_at'],
      ]);
    }
  }
}
