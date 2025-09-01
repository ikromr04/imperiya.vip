<?php

/**
 * Custom helper class
 * @author Ikrom Rahimov ikromr04@gmail.com
 */

namespace App\Helpers;

use Carbon\Carbon;

class Helper
{
  public static function getCurrentEducationPeriod(): array
  {
    $currentDate = Carbon::today();

    $fromDate = ($currentDate->month >= 8)
      ? $currentDate->format('Y') . '-09-01'
      : $currentDate->copy()->subYear()->format('Y') . '-09-01';

    $toDate = ($currentDate->month < 8)
      ? $currentDate->format('Y') . '-07-01'
      : $currentDate->copy()->addYear()->format('Y') . '-07-01';

    return [$fromDate, $toDate];
  }
}
