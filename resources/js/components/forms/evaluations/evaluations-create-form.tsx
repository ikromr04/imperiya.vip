import SelectField from '@/components/ui/formik-controls/select-field';
import { EvaluationsStoreDTO } from '@/dto/marks';
import { useAppDispatch } from '@/hooks';
import { useDropdown } from '@/hooks/use-dropdown';
import { storeEvaluationAction } from '@/store/schedules-slice/schedules-api-actions';
import { ScheduleId } from '@/types/lessons';
import { UserId } from '@/types/users';
import classNames from 'classnames';
import { Form, Formik, FormikHelpers } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';

type EvaluationsCreateFormProps = {
  className?: string;
  userId: UserId;
  scheduleId: ScheduleId;
};

function EvaluationsCreateForm({
  className,
  userId,
  scheduleId,
}: EvaluationsCreateFormProps): JSX.Element {
  const { ref, isOpen, setIsOpen } = useDropdown<HTMLDivElement>();
  const dispatch = useAppDispatch();
  const initialValues: EvaluationsStoreDTO = {
    value: '',
    value2: '',
    user_id: userId,
    schedule_id: scheduleId,
  };

  const onSubmit = async (
    values: EvaluationsStoreDTO,
    helpers: FormikHelpers<EvaluationsStoreDTO>
  ) => {
    helpers.setSubmitting(true);

    await dispatch(storeEvaluationAction({
      dto: values,
      onSuccess: () => setIsOpen(false),
      onValidationError: (error) => helpers.setErrors({ ...error.errors }),
      onFail: (message) => toast.success(message),
    }));

    helpers.setSubmitting(false);
  };

  return (
    <div
      ref={ref}
      className={classNames(
        'relative',
        className,
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="sr-only">Поставить оценку</span>
      </button>

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form className="absolute z-30 !bg-green-400">
            <SelectField
              name="value"
              options={['0', '2', '3', '4', '5'].map((value) => ({ value, label: value }))}
            />
            {values.value && values.value !== '0' && (
              <SelectField
                name="value2"
                options={['2', '3', '4', '5'].map((value) => ({ value, label: value }))}
              />
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EvaluationsCreateForm;
