import Button from '@/components/ui/button';
import SelectField from '@/components/ui/fields/select-field';
import { GradeUpdateDTO } from '@/dto/grades';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { updateGradeAction } from '@/store/grades-slice/grades-api-actions';
import { fetchUsersAction } from '@/store/users-slice/users-api-actions';
import { getStudents } from '@/store/users-slice/users-selector';
import { Grade, Grades } from '@/types/grades';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  level: Yup.number().required('Обязательное поле.'),
  group: Yup.string().required('Обязательное поле.'),
});

type GradesEditFormProps = {
  grade: Grade;
  grades: Grades;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

function GradesEditForm({
  grade,
  grades,
  setIsOpen,
}: GradesEditFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const students = useAppSelector(getStudents);
  const initialValues: GradeUpdateDTO = {
    id: grade.id,
    level: grade.level,
    group: grade.group,
    students: grade.students ? grade.students.map(({ id }) => id) : [],
  };

  useEffect(() => {
    if (!students) dispatch(fetchUsersAction());
  }, [dispatch, students]);

  const onSubmit = async (
    values: GradeUpdateDTO,
    helpers: FormikHelpers<GradeUpdateDTO>
  ) => {
    helpers.setSubmitting(true);
    const gradeExists = grades.some((grade) => grade.id !== values.id && grade.level === values.level && grade.group === values.group);
    if (gradeExists) {
      helpers.setErrors({
        level: 'Выбранный класс уже существует.',
        group: ' ',
      });

      return;
    }

    await dispatch(updateGradeAction({
      dto: values,
      onSuccess: () => {
        toast.success('Данные успешно сохранены.');
        setIsOpen(false);
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
      {({ isSubmitting, values }) => (
        <Form>
          <div className="flex items-center justify-between gap-2 mb-4">
            <h3 className="title">Редактирование класса</h3>

            <Button
              className="ml-auto"
              type="reset"
              icon="close"
              variant="error"
              onClick={() => setIsOpen(false)}
            >
              <span className="sr-only">Отмена</span>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-x-4 mb-2">
            <SelectField
              name="level"
              label="Уровень"
              options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((level) => ({ value: level, label: level.toString() }))}
            />

            <SelectField
              name="group"
              label="Группа"
              options={['А', 'Б', 'В', 'Г', 'Д', 'Е'].map((level) => ({ value: level, label: level.toString() }))}
            />
          </div>

          {students &&
            <SelectField
              className="mb-4"
              name="students"
              multiple
              searchable
              label={`Ученики (${values.students.length})`}
              options={(students || []).map((student) => ({ value: student.id, label: student.user.name }))}
            />}

          <div className="flex items-center justify-end gap-2 sm:col-span-2">
            <Button
              className="justify-center min-w-[92px]"
              type="submit"
              icon="update"
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

export default GradesEditForm;
