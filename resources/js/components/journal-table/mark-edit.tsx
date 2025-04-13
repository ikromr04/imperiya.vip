import { useAppDispatch } from '@/hooks';
import { updateMarkAction } from '@/store/marks-slice/marks-api-actions';
import { Mark } from '@/types/marks';
import classNames from 'classnames';
import React, { BaseSyntheticEvent, useState } from 'react';
import { toast } from 'react-toastify';

type MarkEditProps = {
  mark: Mark;
}

function MarkEdit({
  mark,
}: MarkEditProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [value, setValue] = useState(mark.score1);

  const onBlur = (evt: BaseSyntheticEvent) => {
    setIsSubmitting(evt.target.value !== mark.score1);

    if ((evt.target.value !== mark.score1)) dispatch(updateMarkAction({
      dto: {
        id: mark.id,
        score_1: evt.target.value.toLowerCase(),
      },
      onSuccess: () => setIsSubmitting(false),
      onFail: (message) => {
        toast.error(message);
        setIsSubmitting(false);
        setValue(mark.score1);
      },
    }));
  };

  return (
    <input
      className={classNames(
        'flex items-center justify-center w-[39px] h-[38px] text-center min-w-0 p-2 -m-2 bg-transparent',
        isSubmitting && 'opacity-60 pointer-events-none',
      )}
      value={value}
      onChange={(evt: BaseSyntheticEvent) => setValue(evt.target.value)}
      onBlur={onBlur}
    />
  );
}

export default MarkEdit;
