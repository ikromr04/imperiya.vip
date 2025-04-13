import { useAppDispatch } from '@/hooks';
import { updateEvaluationAction } from '@/store/schedules-slice/schedules-api-actions';
import { Evaluation } from '@/types/lessons';
import classNames from 'classnames';
import React, { BaseSyntheticEvent, useState } from 'react';
import { toast } from 'react-toastify';

type EvaluationEditProps = {
  evaluation: Evaluation;
}

function EvaluationEdit({
  evaluation,
}: EvaluationEditProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [value, setValue] = useState(evaluation.value);

  const onBlur = (evt: BaseSyntheticEvent) => {
    setIsSubmitting(evt.target.value !== evaluation.value);

    if ((evt.target.value !== evaluation.value)) dispatch(updateEvaluationAction({
      dto: {
        id: evaluation.id,
        value: evt.target.value.toLowerCase(),
      },
      onSuccess: () => setIsSubmitting(false),
      onFail: (message) => {
        toast.error(message);
        setIsSubmitting(false);
        setValue(evaluation.value);
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

export default EvaluationEdit;
