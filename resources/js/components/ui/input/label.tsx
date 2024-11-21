import React, { ReactNode } from 'react';

export default function Label({
  label,
}: {
  label?: string;
}): ReactNode {
  if (!label) return null;

  return (
    <span className="input-label">{label}</span>
  );
}
