<?php

namespace Database\Seeders;

use App\Models\RegisterLink;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Carbon\Carbon;

class RegisterLinkSeeder extends Seeder
{
  public function run(): void
  {
    foreach (range(1, 3) as $key) {
      RegisterLink::create([
        'token' => Str::random(16),
        'expires_at' => Carbon::yesterday(),
      ]);
    }
    foreach (range(1, 2) as $key) {
      RegisterLink::create([
        'token' => Str::random(16),
        'expires_at' => Carbon::now()->addHour(),
      ]);
    }
  }
}
