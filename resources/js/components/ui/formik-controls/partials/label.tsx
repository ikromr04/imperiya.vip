import React, { LabelHTMLAttributes, ReactNode } from 'react';

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  label?: string;
  required?: boolean;
};

function Label({
  label,
  required,
  ...props
}: LabelProps): ReactNode {
  if (!label) return null;

  return (
    <label className="relative z-0 rounded flex leading-none mb-[2px] max-w-max text-sm text-gray-500 ml-2" {...props}>
      {label}
      {required && <span className="text-danger transform scale-[1.4] translate-y-[10%] translate-x-[16%]">*</span>}
    </label>
  );
}

export default Label;
