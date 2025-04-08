import { useField } from 'formik';
import React, { ReactNode } from 'react';

type ErrorMessageProps = {
  name: string;
}

function ErrorMessage({
  name,
}: ErrorMessageProps): ReactNode {
  const [, meta] = useField(name);

  if (!meta.error || !meta.touched) return null;

  return (
    <p className="flex text-danger pt-1 text-sm pl-2 leading-none">
      {meta.error}
    </p>
  );
}

export default ErrorMessage;
