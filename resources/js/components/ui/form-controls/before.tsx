import React, { ReactNode } from 'react';

type BeforeProps = {
  element?: ReactNode;
};

function Before({
  element,
}: BeforeProps): ReactNode {
  if (!element) return;

  return (
    <div className="absolute left-[1px] top-[1px] rounded-r-[3px] transform w-[30px] h-[30px] flex justify-center items-center">
      {element}
    </div>
  );
}

export default Before;
