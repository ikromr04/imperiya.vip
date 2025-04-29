import React, { ReactNode } from 'react';

function After({
  element,
}: {
  element?: ReactNode;
}): ReactNode {
  if (!element) return;

  return (
    <div className="absolute right-[1px] top-[1px] rounded-r-[3px] transform w-[30px] h-[30px] flex justify-center items-center">
      {element}
    </div>
  );
}

export default After;
