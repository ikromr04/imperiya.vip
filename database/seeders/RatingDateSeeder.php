<?php

namespace Database\Seeders;

use App\Models\RatingDate;
use Illuminate\Database\Seeder;

class RatingDateSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    RatingDate::create([
      'years' => '2024-2025',
      'quarter1' => '2024-10-31',
      'quarter2' => '2024-12-30',
      'semester1' => '2024-12-30',
      'quarter3' => '2025-03-20',
      'quarter4' => '2025-05-25',
      'semester2' => '2025-05-25',
      'annual' => '2025-05-25',
      'assessment' => '2025-05-25',
      'final' => '2025-05-25',
    ]);
  }
}
