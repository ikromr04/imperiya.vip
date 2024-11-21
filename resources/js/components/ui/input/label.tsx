import React, { ReactNode } from 'react';

export default function Label({
  label,
}: {
  label?: string;
}): ReactNode {
  if (!label) return null;

  return (
    <span className="relative z-0 overflow-hidden rounded flex max-w-max text-sm text-gray-500 ml-2">
      {label}
    </span>
  );
}
