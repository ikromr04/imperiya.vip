import React, { ReactNode } from 'react';

function Label({
  label,
}: {
  label?: string;
}): ReactNode {
  if (!label) return null;

  return (
    <span className="flex text-sm text-gray-500 ml-2">
      {label}
    </span>
  );
}

export default Label;
