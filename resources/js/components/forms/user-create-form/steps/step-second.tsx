import { useFormikContext } from 'formik';
import React from 'react';

function StepSecond(): JSX.Element {
  const form = useFormikContext();

  return (
    <div>StepSecond</div>
  );
}

export default StepSecond;
