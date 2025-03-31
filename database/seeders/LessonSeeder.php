<?php

namespace Database\Seeders;

use App\Models\Lesson;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LessonSeeder extends Seeder
{
  public function run(): void
  {
    $lessons = array(
      (object)['id' => '1','name' => 'Проект','created_at' => '2025-03-28 15:48:49','updated_at' => '2025-03-29 00:07:19'],
      (object)['id' => '2','name' => 'Гос.язык','created_at' => '2025-03-28 15:48:49','updated_at' => '2025-03-29 00:07:34'],
      (object)['id' => '3','name' => 'География','created_at' => '2025-03-28 15:48:49','updated_at' => '2025-03-29 00:06:32'],
      (object)['id' => '4','name' => 'История ТН','created_at' => '2025-03-28 15:48:49','updated_at' => '2025-03-29 00:06:14'],
      (object)['id' => '5','name' => 'Китайский язык','created_at' => '2025-03-28 15:48:49','updated_at' => '2025-03-29 00:07:08'],
      (object)['id' => '6','name' => 'Спорт','created_at' => '2025-03-28 15:48:49','updated_at' => '2025-03-29 00:06:58'],
      (object)['id' => '7','name' => 'История','created_at' => '2025-03-28 15:48:49','updated_at' => '2025-03-29 00:08:26'],
      (object)['id' => '8','name' => 'English (развитие речи)','created_at' => '2025-03-28 15:48:49','updated_at' => '2025-03-29 00:08:09'],
      (object)['id' => '9','name' => 'Письмо','created_at' => '2025-03-29 00:22:28','updated_at' => '2025-03-29 00:22:28'],
      (object)['id' => '10','name' => 'Физика','created_at' => '2025-03-29 00:08:37','updated_at' => '2025-03-29 00:08:37'],
      (object)['id' => '11','name' => 'Программирование','created_at' => '2025-03-29 00:08:47','updated_at' => '2025-03-29 00:08:47'],
      (object)['id' => '12','name' => 'Химия','created_at' => '2025-03-29 00:09:00','updated_at' => '2025-03-29 00:09:00'],
      (object)['id' => '13','name' => 'English (чтение)','created_at' => '2025-03-29 00:09:11','updated_at' => '2025-03-29 00:09:11'],
      (object)['id' => '14','name' => 'Русский язык','created_at' => '2025-03-29 00:09:26','updated_at' => '2025-03-29 00:09:26'],
      (object)['id' => '15','name' => 'Литература','created_at' => '2025-03-29 00:10:38','updated_at' => '2025-03-29 00:10:38'],
      (object)['id' => '16','name' => 'ОГП','created_at' => '2025-03-29 00:12:26','updated_at' => '2025-03-29 00:12:26'],
      (object)['id' => '17','name' => 'Биология','created_at' => '2025-03-29 00:12:33','updated_at' => '2025-03-29 00:12:33'],
      (object)['id' => '18','name' => 'История религии','created_at' => '2025-03-29 00:12:43','updated_at' => '2025-03-29 00:12:43'],
      (object)['id' => '19','name' => 'Алгебра','created_at' => '2025-03-29 00:12:50','updated_at' => '2025-03-29 00:12:50'],
      (object)['id' => '20','name' => 'Логика','created_at' => '2025-03-29 00:12:55','updated_at' => '2025-03-29 00:12:55'],
      (object)['id' => '21','name' => 'Геометрия','created_at' => '2025-03-29 00:13:07','updated_at' => '2025-03-29 00:13:07'],
      (object)['id' => '22','name' => 'English (грамматика)','created_at' => '2025-03-29 00:13:19','updated_at' => '2025-03-29 00:13:19'],
      (object)['id' => '23','name' => 'Технология','created_at' => '2025-03-29 00:13:31','updated_at' => '2025-03-29 00:13:31'],
      (object)['id' => '24','name' => 'Экология','created_at' => '2025-03-29 00:13:40','updated_at' => '2025-03-29 00:13:40'],
      (object)['id' => '25','name' => 'Школа бизнеса','created_at' => '2025-03-29 00:13:50','updated_at' => '2025-03-29 00:13:50'],
      (object)['id' => '26','name' => 'Медиаграмотность','created_at' => '2025-03-29 00:14:03','updated_at' => '2025-03-29 00:14:03'],
      (object)['id' => '27','name' => 'Черчение','created_at' => '2025-03-29 00:14:09','updated_at' => '2025-03-29 00:14:09'],
      (object)['id' => '28','name' => 'English Клаб','created_at' => '2025-03-29 00:14:20','updated_at' => '2025-03-29 00:14:20'],
      (object)['id' => '29','name' => 'Вопитательный час','created_at' => '2025-03-29 00:14:38','updated_at' => '2025-03-29 00:14:38'],
      (object)['id' => '30','name' => 'Урок счастья','created_at' => '2025-03-29 00:15:22','updated_at' => '2025-03-29 00:15:22'],
      (object)['id' => '31','name' => 'Школа этикета','created_at' => '2025-03-29 00:15:45','updated_at' => '2025-03-29 00:15:45'],
      (object)['id' => '32','name' => 'Логическое мышление','created_at' => '2025-03-29 00:16:02','updated_at' => '2025-03-29 00:16:02'],
      (object)['id' => '33','name' => 'Проект деятельности','created_at' => '2025-03-29 00:16:13','updated_at' => '2025-03-29 00:16:13'],
      (object)['id' => '34','name' => 'Креативное мышление','created_at' => '2025-03-29 00:16:30','updated_at' => '2025-03-29 00:16:30'],
      (object)['id' => '35','name' => 'Математика','created_at' => '2025-03-29 00:16:47','updated_at' => '2025-03-29 00:16:47'],
      (object)['id' => '36','name' => 'Актерское мастерство','created_at' => '2025-03-29 00:17:04','updated_at' => '2025-03-29 00:21:41'],
      (object)['id' => '37','name' => 'Менар','created_at' => '2025-03-29 00:17:11','updated_at' => '2025-03-29 00:17:11'],
      (object)['id' => '38','name' => 'Продленка','created_at' => '2025-03-29 00:17:28','updated_at' => '2025-03-29 00:17:28'],
      (object)['id' => '39','name' => 'Проектная деят.','created_at' => '2025-03-29 00:17:53','updated_at' => '2025-03-29 00:17:53'],
      (object)['id' => '40','name' => 'Рисование','created_at' => '2025-03-29 00:19:18','updated_at' => '2025-03-29 00:19:18'],
      (object)['id' => '41','name' => 'Чтение','created_at' => '2025-03-29 00:19:31','updated_at' => '2025-03-29 00:19:31'],
      (object)['id' => '42','name' => 'Окружающий мир','created_at' => '2025-03-29 00:19:40','updated_at' => '2025-03-29 00:19:40'],
      (object)['id' => '43','name' => 'Молекулярная кухня','created_at' => '2025-03-29 00:20:02','updated_at' => '2025-03-29 00:20:02'],
      (object)['id' => '44','name' => 'Вокал','created_at' => '2025-03-29 00:20:09','updated_at' => '2025-03-29 00:20:09'],
      (object)['id' => '45','name' => 'English (фонетика)','created_at' => '2025-03-29 00:20:22','updated_at' => '2025-03-29 00:20:22'],
      (object)['id' => '46','name' => 'Чистописание','created_at' => '2025-03-29 00:21:59','updated_at' => '2025-03-29 00:21:59'],
      (object)['id' => '47','name' => 'Азбука','created_at' => '2025-03-29 00:22:14','updated_at' => '2025-03-29 00:22:14'],
    );

    foreach ($lessons as $lesson) {
      Lesson::create([
        'name' => $lesson->name,
      ]);
    }
  }
}
