import { Hour } from '@/const/lessons';
import React, { ReactNode } from 'react';

type LessonHourProps = {
  hour: keyof typeof Hour;
}

function LessonHour({
  hour,
}: LessonHourProps): ReactNode {
  if (!Hour[hour]) return null;

  const from = Hour[hour].split(' ')[0];
  const to = Hour[hour].split(' ')[1];

  return (
    <div className="w-max">
      {from.slice(0, 2)} <sup>{from.slice(2, 4)}</sup>
      <span> - </span>
      {to.slice(0, 2)} <sup>{to.slice(2, 4)}</sup>
    </div>
  );
}

export default LessonHour;
