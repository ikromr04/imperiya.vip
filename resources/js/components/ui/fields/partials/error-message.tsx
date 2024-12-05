import { useField } from 'formik';
import React, { ReactNode } from 'react';

export default function ErrorMessage({
  name,
}: {
  name: string;
}): ReactNode {
  const [, meta] = useField(name);

  if (!meta.error || !meta.touched) return null;

  return (
    <p className="flex text-error pt-1 text-sm pl-2 leading-none">
      {meta.error}
    </p>
  );
}
