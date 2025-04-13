import Button from '@/components/ui/button';
import Checkbox from '@/components/ui/checkbox/checkbox';
import { LessonDeleteDTO } from '@/dto/lessons';
import { useAppDispatch } from '@/hooks';
import { deleteLessonAction } from '@/store/lessons-slice/lessons-api-actions';
import { Lessons } from '@/types/lessons';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

type LessonsDeleteFormProps = {
  week: number;
  dto: LessonDeleteDTO;
  setDTO: Dispatch<SetStateAction<LessonDeleteDTO | null>>;
  setLessons: Dispatch<SetStateAction<Lessons | null>>;
};

function LessonsDeleteForm({
  week,
  dto,
  setDTO,
  setLessons,
}: LessonsDeleteFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const initialValues: LessonDeleteDTO = {
    id: dto.id,
    all: dto.all,
  };

  const onSubmit = async (
    values: LessonDeleteDTO,
    helpers: FormikHelpers<LessonDeleteDTO>
  ) => {
    helpers.setSubmitting(true);

    await dispatch(deleteLessonAction({
      week,
      dto: values,
      onSuccess: (lessons) => {
        toast.success('Расписание успешно обновлен.');
        setDTO(null);
        setLessons(lessons);
      },
      onFail: (message) => toast.success(message),
    }));

    helpers.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="flex items-center justify-between gap-2 mb-4">
            <h3 className="title">Удаление занятия</h3>

            <Button
              className="ml-auto"
              type="reset"
              variant="danger"
              icon="close"
              onClick={() => setDTO(null)}
            >
              <span className="sr-only">Отмена</span>
            </Button>
          </div>

          <p>Вы уверены что хотите удалить?</p>

          <Checkbox
            className="col-span-2"
            name="all"
            label="Удалить везде"
          />

          <div className="flex items-center justify-end gap-2 sm:col-span-2">
            <Button
              className="justify-center min-w-[92px]"
              type="submit"
              icon="delete"
              disabled={isSubmitting}
              loading={isSubmitting}
              variant="danger"
            >
              Удалить
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default LessonsDeleteForm;
