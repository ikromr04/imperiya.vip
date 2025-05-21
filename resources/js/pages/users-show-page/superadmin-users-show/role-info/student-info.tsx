import { Icons } from '@/components/icons';
import Button from '@/components/ui/button';
import DescriptionList from '@/components/ui/description-list';
import Modal from '@/components/ui/modal';
import Spinner from '@/components/ui/spinner';
import Tooltip from '@/components/ui/tooltip';
import { AppRoute } from '@/const/routes';
import { RoleName } from '@/const/users';
import { useAppSelector } from '@/hooks';
import { getGrades } from '@/store/grades-slice/grades-selector';
import { getUsers } from '@/store/users-slice/users-selector';
import { User } from '@/types/users';
import dayjs from 'dayjs';
import React, { lazy, Suspense, useState } from 'react';
import { generatePath, Link } from 'react-router-dom';

const RoleEditForm = lazy(() => import('@/components/forms/users/role-edit-form/role-edit-form'));

type StudentInfoProps = {
  user: User;
};

function StudentInfo({
  user,
}: StudentInfoProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const grades = useAppSelector(getGrades);
  const users = useAppSelector(getUsers);

  const grade = grades?.find(({ id }) => id === user.student?.gradeId);
  const mother = users?.find(({ id }) => id === user.student?.motherId);
  const father = users?.find(({ id }) => id === user.student?.fatherId);
  const gradeLeader = users?.find(({ id }) => id === grade?.teacherId);

  return (
    <>
      <section className="box">
        <header className="box__header">
          <h2 className="title md:!text-lg">{RoleName[user.role]}</h2>

          <Button variant="light" onClick={() => setIsOpen(true)}>
            <Icons.edit width={14} height={14} />
            <Tooltip label="Редактировать" position="left" />
          </Button>
        </header>

        <div className="relative">
          <DescriptionList
            className="box__body"
            list={{
              'Класс': grade ?
                <Link className="text-blue-600" to={generatePath(AppRoute.Classes.Show, { id: grade.id })}>
                  {grade.level} {grade.group}
                </Link> : '-',
              'Мать': mother ?
                <Link className="text-blue-600" to={generatePath(AppRoute.Users.Show, { id: mother.id })}>
                  {mother.surname} {mother.name}
                </Link> : '-',
              'Отец': father ?
                <Link className="text-blue-600" to={generatePath(AppRoute.Users.Show, { id: father.id })}>
                  {father.surname} {father.name}
                </Link> : '-',
              'Руководитель': gradeLeader ? (
                <Link className="text-blue-600" to={generatePath(AppRoute.Users.Show, { id: gradeLeader.id })}>
                  {gradeLeader.surname} {gradeLeader.name}
                </Link>
              ) : '-',
              'С какого года ребенок обучается в ЧОУ «Империя знаний»':
                user.student?.admissionDate ? dayjs(user.student.admissionDate).format('DD MMMM YYYY') : '-',
              'Предыдущие школы': user.student?.previousSchools ?? '-',
              'Медицинские и психологические рекомендации': user.student?.medicalRecommendations ?? '-',
            }}
          />
          <div className="absolute top-[1px] right-0 rounded-br-md z-10 min-w-6 h-[calc(100%-1px)] pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
        </div>
      </section>

      {isOpen && (
        <Modal isOpen={isOpen}>
          <Suspense fallback={<Spinner className="w-10 h-10" />}>
            <RoleEditForm
              user={user}
              setIsOpen={setIsOpen}
            />
          </Suspense>
        </Modal>
      )}
    </>
  );
}

export default StudentInfo;
