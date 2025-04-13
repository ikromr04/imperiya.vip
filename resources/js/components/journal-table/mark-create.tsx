import { useAppDispatch } from '@/hooks';
import { storeMarkAction } from '@/store/marks-slice/marks-api-actions';
import { LessonId } from '@/types/lessons';
import { UserId } from '@/types/users';
import classNames from 'classnames';
import React, { BaseSyntheticEvent, useState } from 'react';
import { toast } from 'react-toastify';

type MarkCreateProps = {
  studentId: UserId;
  lessonId: LessonId;
}

function MarkCreate({
  studentId,
  lessonId,
}: MarkCreateProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onBlur = (evt: BaseSyntheticEvent) => {
    setIsSubmitting(true);

    if (evt.target.value) dispatch(storeMarkAction({
      dto: {
        score_1: evt.target.value.toLowerCase(),
        student_id: studentId,
        lesson_id: lessonId,
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

export default MarkCreate;
