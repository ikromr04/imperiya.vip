<?php

namespace Database\Seeders;

use App\Models\Nationality;
use Illuminate\Database\Seeder;

class NationalitySeeder extends Seeder
{
  public function run(): void
  {
    // $nationalities = array(
    //   array('id' => '1','name' => 'Таджик','created_at' => '2025-04-08 23:09:48','updated_at' => '2025-04-08 23:09:48'),
    //   array('id' => '2','name' => 'Узбек','created_at' => '2025-04-08 23:09:48','updated_at' => '2025-04-08 23:09:48'),
    //   array('id' => '3','name' => 'Русский','created_at' => '2025-04-08 23:09:48','updated_at' => '2025-04-08 23:09:48'),
    //   array('id' => '4','name' => 'Турок','created_at' => '2025-04-08 23:09:48','updated_at' => '2025-04-08 23:09:48'),
    //   array('id' => '5','name' => 'Афганец','created_at' => '2025-04-08 23:09:48','updated_at' => '2025-04-08 23:09:48'),
    //   array('id' => '6','name' => 'Китаец','created_at' => '2025-04-08 23:09:48','updated_at' => '2025-04-08 23:09:48'),
    //   array('id' => '7','name' => 'Татар','created_at' => '2025-04-08 23:09:48','updated_at' => '2025-04-08 23:09:48'),
    //   array('id' => '8','name' => 'Другая национальность','created_at' => '2025-04-08 23:09:48','updated_at' => '2025-04-08 23:09:48')
    // );

    $nationalities = array(
      array('id' => '1','name' => 'Таджик','created_at' => '2025-04-08 23:09:48','updated_at' => '2025-04-08 23:09:48','deleted_at' => NULL),
      array('id' => '2','name' => 'Узбек','created_at' => '2025-04-08 23:09:48','updated_at' => '2025-04-08 23:09:48','deleted_at' => NULL),
      array('id' => '3','name' => 'Русский','created_at' => '2025-04-08 23:09:48','updated_at' => '2025-04-08 23:09:48','deleted_at' => NULL),
      array('id' => '4','name' => 'Турок','created_at' => '2025-04-08 23:09:48','updated_at' => '2025-04-08 23:09:48','deleted_at' => NULL),
      array('id' => '5','name' => 'Афганец','created_at' => '2025-04-08 23:09:48','updated_at' => '2025-04-08 23:09:48','deleted_at' => NULL),
      array('id' => '6','name' => 'Китаец','created_at' => '2025-04-08 23:09:48','updated_at' => '2025-04-08 23:09:48','deleted_at' => NULL),
      array('id' => '7','name' => 'Татар','created_at' => '2025-04-08 23:09:48','updated_at' => '2025-04-08 23:09:48','deleted_at' => NULL),
      array('id' => '8','name' => 'Другая национальность','created_at' => '2025-04-08 23:09:48','updated_at' => '2025-04-08 23:09:48','deleted_at' => NULL),
      array('id' => '9','name' => 'Туркмен','created_at' => '2025-04-16 00:48:38','updated_at' => '2025-04-16 00:48:38','deleted_at' => NULL)
    );

    foreach ($nationalities as $nationality) {
      Nationality::create([
        'id' => $nationality['id'],
        'name' => $nationality['name'],
        'created_at' => $nationality['created_at'],
        'updated_at' => $nationality['updated_at'],
      ]);
    }
  }
}
