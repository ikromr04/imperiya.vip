import { Icons } from '@/components/icons';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import Button from '@/components/ui/button';
import Modal from '@/components/ui/modal';
import Spinner from '@/components/ui/spinner';
import Tooltip from '@/components/ui/tooltip';
import { AppRoute } from '@/const/routes';
import { AsyncStatus } from '@/const/store';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchGradesAction } from '@/store/grades-slice/grades-api-actions';
import { getGrades, getGradesStatus } from '@/store/grades-slice/grades-selector';
import { fetchUsersAction } from '@/store/users-slice/users-api-actions';
import { getUsers, getUsersStatus } from '@/store/users-slice/users-selector';
import { getNextGradeId, getPreviousGradeId } from '@/utils/grades';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { generatePath, Link, useParams } from 'react-router-dom';

const GradesDeleteForm = lazy(() => import('@/components/forms/grades/grades-delete-form'));
const GradesEditForm = lazy(() => import('@/components/forms/grades/grades-edit-form'));

function SuperadminGradesShow(): JSX.Element {
  const params = useParams();
  const dispatch = useAppDispatch();
  const gradesStatus = useAppSelector(getGradesStatus);
  const usersStatus = useAppSelector(getUsersStatus);

  const grades = useAppSelector(getGrades);
  const users = useAppSelector(getUsers);

  const [isEditting, setIsEditting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const grade = grades?.find(({ id }) => id === +(params.id || 0)) || null;
  const students = users?.filter((user) => user.student?.gradeId === grade?.id);
  const teacher = users?.find(({ id }) => id === grade?.teacherId);

  useEffect(() => {
    if (gradesStatus === AsyncStatus.Idle) dispatch(fetchGradesAction());
    if (usersStatus === AsyncStatus.Idle) dispatch(fetchUsersAction());
  }, [dispatch, gradesStatus, usersStatus]);

  if (!grade || !grades) {
    return <Spinner className="w-8 h-8" />;
  }

  return (
    <>
      <main className="pt-4 pb-40">
        <Breadcrumbs
          items={[
            ['Все классы', AppRoute.Classes.Index],
            [`${grade.level} ${grade.group}`, ''],
          ]}
        />

        <header className="flex items-end justify-end mb-4">
          <div className="flex items-center gap-1">
            <Button
              variant="light"
              href={generatePath(AppRoute.Classes.Show, { id: getPreviousGradeId(grades, grade.id) })}
            >
              <Icons.previous width={14} height={14} />
              <span className="sr-only md:not-sr-only">Предыдущий</span>
            </Button>
            <Button
              variant="light"
              href={generatePath(AppRoute.Classes.Show, { id: getNextGradeId(grades, grade.id) })}
            >
              <span className="sr-only md:not-sr-only">Следующий</span>
              <Icons.next width={14} height={14} />
            </Button>
          </div>
        </header>

        <div className="box">
          <div className="box__header">
            <h1 className="title">
              Класс {grade.level}<sup>"</sup>{grade.group}<sup>"</sup>
            </h1>

            <Button variant="light" onClick={() => setIsEditting(true)}>
              <Icons.edit width={14} height={14} />
              <Tooltip label="Редактировать" position="left" />
            </Button>
          </div>

          <section className="box__body">
            <h2 className="title !text-lg">Руководитель</h2>

            <div className="flex flex-wrap gap-1">
              {teacher && (
                <Link
                  className="py-1 px-2 border rounded bg-gray-100 hover:bg-blue-50"
                  to={generatePath(AppRoute.Users.Show, { id: teacher.id })}
                >
                  {teacher.surname} {teacher.name} {teacher.patronymic}
                </Link>
              )}
            </div>
          </section>

          <section className="box__body">
            <h2 className="title !text-lg">Ученики ({students?.length})</h2>

            <div className="flex flex-wrap gap-1">
              {students?.map(({ id, surname, name }) => (
                <Link
                  key={id}
                  className="py-1 px-2 border rounded bg-gray-100 hover:bg-blue-50"
                  to={generatePath(AppRoute.Users.Show, { id })}
                >
                  {surname} {name}
                </Link>
              ))}
            </div>
          </section>
        </div>

        <Button
          className="ml-auto mt-2 md:mt-4"
          variant="danger"
          onClick={() => setIsDeleting(true)}
        >
          <Icons.delete width={14} height={14} />
          Удалить класс
        </Button>
      </main>

      {isDeleting && (
        <Modal isOpen={isDeleting}>
          <Suspense fallback={<Spinner className="w-8 h-8" />}>
            <GradesDeleteForm
              key={isDeleting.toString()}
              grades={grades}
              grade={grade}
              setIsOpen={setIsDeleting}
            />
          </Suspense>
        </Modal>
      )}

      {isEditting && (
        <Modal isOpen={isEditting}>
          <Suspense fallback={<Spinner className="w-8 h-8" />}>
            <GradesEditForm
              key={isEditting.toString()}
              grade={grade}
              grades={grades}
              setIsOpen={setIsEditting}
            />
          </Suspense>
        </Modal>
      )}
    </>
  );
}

export default SuperadminGradesShow;
