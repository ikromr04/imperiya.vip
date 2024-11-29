import React, { LabelHTMLAttributes, ReactNode } from 'react';

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  label?: string;
};

export default function Label({
  label,
  ...props
}: LabelProps): ReactNode {
  if (!label) return null;

  return (
    <label className="relative z-0 rounded flex max-w-max text-sm text-gray-500 ml-2" {...props}>
      {label}
    </label>
  );
}
