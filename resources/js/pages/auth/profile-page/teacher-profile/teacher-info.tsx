import DescriptionList from '@/components/ui/description-list';
import { AppRoute } from '@/const/routes';
import { RoleName } from '@/const/users';
import { useAppSelector } from '@/hooks';
import { getGrades } from '@/store/grades-slice/grades-selector';
import { User } from '@/types/users';
import React from 'react';
import { generatePath, Link } from 'react-router-dom';

type TeacherInfoProps = {
  user: User;
};

function TeacherInfo({
  user,
}: TeacherInfoProps): JSX.Element {
  const grades = useAppSelector(getGrades);
  const leaderGrades = grades?.filter((grade) => grade.teacherId === user.id);

  return (
    <section className="box">
      <header className="box__header">
        <h2 className="title md:!text-lg">{RoleName[user.role]}</h2>
      </header>

      <div className="relative">
        <DescriptionList
          className="box__body"
          list={{
            'Руководитель класса': leaderGrades?.length ? (
              <div className="flex flex-wrap gap-2">
                {leaderGrades.map((grade) => (
                  <Link
                    key={grade.id}
                    className="text-blue-600"
                    to={generatePath(AppRoute.Classes.Show, { id: grade.id })}
                  >
                    {grade.level} {grade.group}
                  </Link>
                ))}
              </div>
            ) : '-',
            'Образование': user.teacher?.education ?? '-',
            'Достижения': user.teacher?.achievements ?? '-',
            'Опыт работы': user.teacher?.workExperience ?? '-',
          }}
        />
        <div className="absolute top-[1px] right-0 rounded-br-md z-10 min-w-6 h-[calc(100%-1px)] pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
      </div>
    </section>
  );
}

export default TeacherInfo;
