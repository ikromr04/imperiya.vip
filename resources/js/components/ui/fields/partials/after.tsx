import React, { ReactNode } from 'react';

export default function After({
  icon,
}: {
  icon?: ReactNode;
}): ReactNode {
  if (!icon) return null;

  return (
    <div className="absolute right-[1px] top-[1px] rounded-r-[3px] transform w-[34px] h-[34px] flex justify-center items-center">
      {icon}
    </div>
  );
}
