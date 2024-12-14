import React, { ReactNode } from 'react';
import { PropsWithClassname } from '../../types';

type DescriptionListProps = PropsWithClassname<{
  list: {
    [term: string]: ReactNode;
  }
}>;

export default function DescriptionList(): JSX.Element {
  return (
    <dl className="grid grid-cols-[1fr_3fr] gap-4">
      DescriptionList
    </dl>
  );
}
