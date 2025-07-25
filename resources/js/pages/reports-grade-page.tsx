import Breadcrumbs from '@/components/ui/breadcrumbs';
import Button from '@/components/ui/button';
import DescriptionList from '@/components/ui/description-list';
import Spinner from '@/components/ui/spinner';
import { AppRoute } from '@/const/routes';
import { AsyncStatus } from '@/const/store';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchGradesAction } from '@/store/grades-slice/grades-api-actions';
import { getGrades, getGradesStatus } from '@/store/grades-slice/grades-selector';
import { fetchMarksByStudentIdsAction } from '@/store/marks-slice/marks-api-actions';
import { fetchUsersAction } from '@/store/users-slice/users-api-actions';
import { getUsers, getUsersStatus } from '@/store/users-slice/users-selector';
import { Marks } from '@/types/marks';
import { exportGradeReportToExcel } from '@/utils/reports';
import React, { useEffect, useMemo, useState } from 'react';
import { generatePath, Link, useParams } from 'react-router-dom';

function ReportsGradePage(): JSX.Element {
  const params = useParams();
  const [marks, setMarks] = useState<Marks>();
  const dispatch = useAppDispatch();

  const usersStatus = useAppSelector(getUsersStatus);
  const gradesStatus = useAppSelector(getGradesStatus);

  const users = useAppSelector(getUsers);
  const grades = useAppSelector(getGrades);
  const grade = grades?.find((grade) => grade.id === +(params.id || 0)) || null;
  const students = (grade && users) ? users.filter((user) => user.role === 'student' && user.student?.gradeId === grade?.id) : undefined;

  useEffect(() => {
    if (usersStatus === AsyncStatus.Idle) dispatch(fetchUsersAction());
    if (gradesStatus === AsyncStatus.Idle) dispatch(fetchGradesAction());
  }, [dispatch, gradesStatus, usersStatus]);

  useEffect(() => {
    if (!marks && students) dispatch(fetchMarksByStudentIdsAction({
      ids: students.map(({ id }) => id),
      onSuccess: (marks) => setMarks(marks),
    }));
  }, [dispatch, marks, students]);

  const markObject = useMemo(() => {
    const object: Record<number, number[]> = {};
    if (marks && grades && users) {
      marks.forEach((mark) => {
        if (!object[mark.studentId] && (mark.score1 || mark.score2)) {
          object[mark.studentId] = [];
        }
        if (mark.score1) object[mark.studentId].push(mark.score1);
        if (mark.score2) object[mark.studentId].push(mark.score2);
      });

      return object;
    }
  }, [grades, marks, users]);

  const reportData = useMemo(() => {
    if (markObject && grade && students) {
      const studentsMap = students.map((student) => {
        const average = markObject[student.id] ? (markObject[student.id].reduce((acc, score) => acc + score, 0) / markObject[student.id].length) : 0;

        return {
          id: student.id,
          name: `${student.surname} ${student.name} ${student.patronymic || ''}`,
          average,
          rounded: Math.round(average),
        };
      });

      const dataStudents = {
        excellent: studentsMap.filter((student) => student.average && (Math.round(student.average) === 5)),
        good: studentsMap.filter((student) => student.average && (Math.round(student.average) === 4)),
        average: studentsMap.filter((student) => student.average && (Math.round(student.average) === 3)),
        poor: studentsMap.filter((student) => student.average && (Math.round(student.average) === 2)),
        noGrades: studentsMap.filter((student) => !student.average),
      };

      return {
        classInfo: {
          class: `${grade.level}${grade.group}`,
          totalStudents: students.length,
          girls: students.filter(({ sex }) => sex === 'female').length,
          boys: students.filter(({ sex }) => sex === 'male').length,
          excellent: {
            count: dataStudents.excellent.length,
            percent: +((dataStudents.excellent.length * 100) / students.length).toFixed(2),
          },
          good: {
            count: dataStudents.good.length,
            percent: +((dataStudents.good.length * 100) / students.length).toFixed(2),
          },
          average: {
            count: dataStudents.average.length,
            percent: +((dataStudents.average.length * 100) / students.length).toFixed(2),
          },
          poor: {
            count: dataStudents.poor.length,
            percent: +((dataStudents.poor.length * 100) / students.length).toFixed(2),
          },
          noGrades: {
            count: dataStudents.noGrades.length,
            percent: +((dataStudents.noGrades.length * 100) / students.length).toFixed(2),
          },
        },
        students: dataStudents,
      };
    }
  }, [grade, markObject, students]);

  const categoryMap = {
    excellent: 'Отличники',
    good: 'Четвёрочники',
    average: 'Троечники',
    poor: 'Двоечники',
    noGrades: 'Без оценок',
  };

  if (!reportData) {
    return <Spinner className="w-8 h-8 m-2" />;
  }

  return (
    <main className="pt-2 pb-40 flex flex-col">
      <h1 className="title">
        Класс {reportData.classInfo.class}
      </h1>

      <Breadcrumbs
        items={[
          ['Отчеты', AppRoute.Reports.Index],
          [`${reportData.classInfo.class}`, ''],
        ]}
      />

      <Button
        className="max-h-7 ml-auto mb-2"
        icon="fileExport"
        variant="light"
        onClick={() => exportGradeReportToExcel(reportData)}
      >
        <span className="sr-only md:not-sr-only">Экспорт</span>
      </Button>

      <section className="box">
        <header className="box__header">
          <h2 className="title md:!text-lg">Общая информация</h2>
        </header>

        <div className="relative">
          <DescriptionList
            className="box__body"
            list={{
              'Количество учеников': `${reportData.classInfo.totalStudents} (девочек ${reportData.classInfo.girls} / мальчиков ${reportData.classInfo.boys})`,
              'Отличники': `${reportData.classInfo.excellent.count} (${reportData.classInfo.excellent.percent}%)`,
              'Четвёрочники': `${reportData.classInfo.good.count} (${reportData.classInfo.good.percent}%)`,
              'Троечники': `${reportData.classInfo.average.count} (${reportData.classInfo.average.percent}%)`,
              'Двоечники': `${reportData.classInfo.poor.count} (${reportData.classInfo.poor.percent}%)`,
              'Без оценок': `${reportData.classInfo.noGrades.count} (${reportData.classInfo.noGrades.percent}%)`,
            }}
          />
          <div className="absolute top-[1px] right-0 rounded-br-md z-10 min-w-6 h-[calc(100%-1px)] pointer-events-none bg-gradient-to-l from-white to-transparent" />
        </div>
      </section>

      {Object.entries(categoryMap).map(([key, value]) => (
        <section key={key} className="box mt-4">
          <header className="box__header">
            <h2 className="title md:!text-lg">{value}</h2>
          </header>

          <div className="relative">
            <div className="box__body">
              {reportData.students[key as keyof typeof reportData.students].length ? (
                <table>
                  <thead>
                    <tr>
                      <th className="text-left font-normal text-[15px] min-w-[320px]">ФИО</th>
                      <th className="text-left font-normal text-[15px] min-w-[140px]">Средний балл</th>
                      <th className="text-left font-normal text-[15px] min-w-[160px]">Округлённая оценка</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.students[key as keyof typeof reportData.students].map((student) => (
                      <tr key={student.id} className="py-1">
                        <td className="pr-10">
                          <Link className="text-blue-600" to={generatePath(AppRoute.Users.Show, { id: student.id })}>
                            {student.name}
                          </Link>
                        </td>
                        <td className="pr-10 font-medium text-lg">
                          {student.average?.toFixed(2)}
                        </td>
                        <td className="pr-10 font-medium text-lg">
                          {student.rounded}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : 'Нет учеников'}
            </div>
            <div className="absolute top-[1px] right-0 rounded-br-md z-10 min-w-6 h-[calc(100%-1px)] pointer-events-none bg-gradient-to-l from-white to-transparent" />
          </div>
        </section>
      ))}
    </main>
  );
}

export default ReportsGradePage;
