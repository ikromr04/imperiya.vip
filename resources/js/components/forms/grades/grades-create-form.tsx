import Button from '@/components/ui/button';
import SelectField from '@/components/ui/form-controls/formik/select-field';
import { GradeStoreDTO } from '@/dto/grades';
import { useAppDispatch } from '@/hooks';
import { storeGradeAction } from '@/store/grades-slice/grades-api-actions';
import { Grades } from '@/types/grades';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  level: Yup.number().required('Обязательное поле.'),
  group: Yup.string().required('Обязательное поле.'),
});

type GradesCreateFormProps = {
  grades: Grades;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

function GradesCreateForm({
  grades,
  setIsOpen,
}: GradesCreateFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const initialValues: GradeStoreDTO = {
    level: 1,
    group: 'А',
  };

  const onSubmit = async (
    values: GradeStoreDTO,
    helpers: FormikHelpers<GradeStoreDTO>
  ) => {
    helpers.setSubmitting(true);
    const gradeExists = grades.some((grade) => grade.level === values.level && grade.group === values.group);
    if (gradeExists) {
      helpers.setErrors({
        level: 'Выбранный класс уже существует.',
        group: ' ',
      });

      return;
    }

    await dispatch(storeGradeAction({
      dto: values,
      onSuccess: () => {
        toast.success('Класс успешно добавлен.');
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
      {({ isSubmitting }) => (
        <Form>
          <div className="flex items-center justify-between gap-2 mb-4">
            <h3 className="title">Добавления класса</h3>

            <Button
              className="ml-auto"
              type="reset"
              variant="error"
              icon="close"
              onClick={() => setIsOpen(false)}
            >
              <span className="sr-only">Отмена</span>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-x-4 mb-4">
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

export default GradesCreateForm;
