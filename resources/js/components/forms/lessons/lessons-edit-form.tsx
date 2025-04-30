import Button from '@/components/ui/button';
import Checkbox from '@/components/ui/checkbox/checkbox';
import SelectField from '@/components/ui/formik-controls/select-field';
import { LessonUpdateDTO } from '@/dto/lessons';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { updateLessonAction } from '@/store/lessons-slice/lessons-api-actions';
import { getSubjects } from '@/store/subjects-slice/subjects-selector';
import { getUsers } from '@/store/users-slice/users-selector';
import { Lessons } from '@/types/lessons';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

type LessonsEditFormProps = {
  week: number;
  dto: LessonUpdateDTO;
  setDTO: Dispatch<SetStateAction<LessonUpdateDTO | undefined>>;
  setLessons: Dispatch<SetStateAction<Lessons | undefined>>;
};

function LessonsEditForm({
  week = 0,
  dto,
  setDTO,
  setLessons,
}: LessonsEditFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const users = useAppSelector(getUsers);
  const subjects = useAppSelector(getSubjects);
  const initialValues: LessonUpdateDTO = {
    id: dto.id,
    subject_id: dto.subject_id,
    teacher_id: dto.teacher_id,
  };

  const onSubmit = async (
    values: LessonUpdateDTO,
    helpers: FormikHelpers<LessonUpdateDTO>
  ) => {
    helpers.setSubmitting(true);

    await dispatch(updateLessonAction({
      week,
      dto: values,
      onSuccess: (lessons) => {
        toast.success('Расписание успешно обновлен.');
        setDTO(undefined);
        setLessons(lessons);
      },
      onValidationError: (error) => helpers.setErrors({ ...error.errors }),
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
            <h3 className="title">Редактирование расписания</h3>

            <Button
              className="ml-auto"
              type="reset"
              variant="danger"
              icon="close"
              onClick={() => setDTO(undefined)}
            >
              <span className="sr-only">Отмена</span>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
            {subjects && (
              <SelectField
                name="subject_id"
                label="Урок"
                searchable
                options={subjects.map((subject) => ({ value: subject.id, label: subject.name }))}
              />
            )}

            {users && (
              <SelectField
                name="teacher_id"
                label="Преподователь"
                searchable
                options={users.filter((user) => user.role === 'teacher').map((user) => ({ value: user.id, label: `${user.name} ${user.surname}` }))}
              />
            )}

            <Checkbox
              className="col-span-2"
              name="all"
              label="Редактировать везде"
            />
          </div>

          <div className="flex items-center justify-end gap-2 sm:col-span-2">
            <Button
              className="justify-center min-w-[92px]"
              type="submit"
              icon="edit"
              disabled={isSubmitting}
              loading={isSubmitting}
              variant="success"
            >
              Сохранить
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default LessonsEditForm;
