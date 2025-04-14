import DescriptionList from '@/components/ui/description-list';
import { RoleName } from '@/const/users';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchGradesAction } from '@/store/grades-slice/grades-api-actions';
import { getGrades } from '@/store/grades-slice/grades-selector';
import { fetchStudentAction } from '@/store/users-slice/users-api-actions';
import { getStudent } from '@/store/users-slice/users-selector';
import { User } from '@/types/users';
import React, { useEffect } from 'react';

type StudentInfoProps = {
  user: User;
};

function StudentInfo({
  user,
}: StudentInfoProps): JSX.Element {
  const dispatch = useAppDispatch();
  const student = useAppSelector(getStudent);
  const grades = useAppSelector(getGrades);

  useEffect(() => {
    if (!student.data && !student.isFetching) dispatch(fetchStudentAction());
    if (!grades.data && !grades.isFetching) dispatch(fetchGradesAction());
  }, [dispatch, grades.data, grades.isFetching, student.data, student.isFetching]);

  return (
    <section className="box">
      <header className="box__header">
        <h2 className="title !text-lg">{RoleName[user.role]}</h2>
      </header>

      <div className="relative">
        <DescriptionList
          className="box__body"
          list={{
            'Класс': `${student.data?.grade.level} ${student.data?.grade.group}`,
            'Мать': student.data?.mother ? `${student.data.mother.surname} ${student.data.mother.name}` : '-',
            'Отец': student.data?.father ? `${student.data.father.surname} ${student.data.father.name}` : '-',
          }}
        />
        <div className="absolute top-[1px] right-0 rounded-br-md z-10 min-w-6 h-[calc(100%-1px)] pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
      </div>
    </section>
  );
}

export default StudentInfo;
