import * as Yup from 'yup';
import Button from '@/components/ui/button';
import Checkbox from '@/components/ui/checkbox/checkbox';
import SelectField from '@/components/ui/formik-controls/select-field';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getUsers } from '@/store/users-slice/users-selector';
import dayjs from 'dayjs';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';
import { LessonStoreDTO } from '@/dto/lessons';
import { Lessons } from '@/types/lessons';
import { getSubjects } from '@/store/subjects-slice/subjects-selector';
import { storeLessonAction } from '@/store/lessons-slice/lessons-api-actions';

const validationSchema = Yup.object().shape({
  subject_id: Yup.number()
    .required('Выберите урок.')
    .moreThan(0, 'Выберите урок.'),
});

type LessonsCreateFormProps = {
  week: number;
  dto: LessonStoreDTO;
  setDTO: Dispatch<SetStateAction<LessonStoreDTO | undefined>>;
  setLessons: Dispatch<SetStateAction<Lessons | undefined>>;
};

function LessonsCreateForm({
  week,
  dto,
  setDTO,
  setLessons,
}: LessonsCreateFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const users = useAppSelector(getUsers);
  const subjects = useAppSelector(getSubjects);
  const initialValues: LessonStoreDTO = {
    date: dayjs(dto.date).format('YYYY-MM-DD'),
    hour: dto.hour,
    grade_id: dto.grade_id,
    subject_id: dto.subject_id,
  };

  const onSubmit = async (
    values: LessonStoreDTO,
    helpers: FormikHelpers<LessonStoreDTO>
  ) => {
    helpers.setSubmitting(true);

    await dispatch(storeLessonAction({
      week,
      dto: values,
      onSuccess: (lessons) => {
        toast.success('Расписание успешно добавлено.');
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
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="flex items-center justify-between gap-2 mb-4">
            <h3 className="title">Добавление занятия</h3>

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
              label="Добавить везде"
            />
          </div>

          <div className="flex items-center justify-end gap-2 sm:col-span-2">
            <Button
              className="justify-center min-w-[92px]"
              type="submit"
              icon="add"
              disabled={isSubmitting}
              loading={isSubmitting}
              variant="success"
            >
              Добавить
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default LessonsCreateForm;
