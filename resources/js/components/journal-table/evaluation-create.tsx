import { useAppDispatch } from '@/hooks';
import { storeEvaluationAction } from '@/store/schedules-slice/schedules-api-actions';
import { ScheduleId } from '@/types/schedules';
import { UserId } from '@/types/users';
import classNames from 'classnames';
import React, { BaseSyntheticEvent, useState } from 'react';
import { toast } from 'react-toastify';

type EvaluationCreateProps = {
  userId: UserId;
  scheduleId: ScheduleId;
}

function EvaluationCreate({
  userId,
  scheduleId,
}: EvaluationCreateProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onBlur = (evt: BaseSyntheticEvent) => {
    setIsSubmitting(true);

    if (evt.target.value) dispatch(storeEvaluationAction({
      dto: {
        value: evt.target.value.toLowerCase(),
        user_id: userId,
        schedule_id: scheduleId,
      },
      onSuccess: () => setIsSubmitting(false),
      onFail: (message) => {
        toast.error(message);
        setIsSubmitting(false);
        evt.target.value = '';
      },
    }));
  };

  return (
    <input
      className={classNames(
        'flex items-center justify-center w-[39px] h-[38px] text-center min-w-0 p-2 -m-2 bg-transparent',
        isSubmitting && 'opacity-60 pointer-events-none',
      )}
      onBlur={onBlur}
    />
  );
}

export default EvaluationCreate;
