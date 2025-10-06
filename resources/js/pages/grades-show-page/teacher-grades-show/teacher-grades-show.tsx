import Spinner from '@/components/ui/spinner';
import { ScoreMap } from '@/const/leadership';
import { AppRoute } from '@/const/routes';
import { AsyncStatus } from '@/const/store';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { Data } from '@/pages/leadership-page/leadership-page';
import { fetchGradesAction } from '@/store/grades-slice/grades-api-actions';
import { getGrades, getGradesStatus } from '@/store/grades-slice/grades-selector';
import { fetchLeadershipDataAction } from '@/store/leadership-slice/leadership-api-actions';
import classNames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { generatePath, Link, useParams } from 'react-router-dom';

function TeacherGradesShow(): JSX.Element {
  const params = useParams();
  const dispatch = useAppDispatch();
  const gradesStatus = useAppSelector(getGradesStatus);
  const [data, setData] = useState<Data>();

  const grades = useAppSelector(getGrades);

  const grade = grades?.find(({ id }) => id === +(params.id || 0)) || null;

  useEffect(() => {
    if (gradesStatus === AsyncStatus.Idle) dispatch(fetchGradesAction());
  }, [dispatch, gradesStatus]);

  useEffect(() => {
    if (!data) dispatch(fetchLeadershipDataAction({
      gradeId: grade?.id,
      onSuccess: (data) => setData(data),
    }));
  }, [data, dispatch, grade?.id]);

  const leaderBoard = useMemo(() => {
    if (data) {
      const marksObject: Record<number, number[]> = {};

      data.marks.forEach((mark) => {
        if (!marksObject[mark.studentId]) {
          marksObject[mark.studentId] = [];
        }
        if (mark.score1) marksObject[mark.studentId].push(mark.score1);
        if (mark.score2) marksObject[mark.studentId].push(mark.score2);
      });

      const list = data.users.map((user) => {
        const grade = data.grades.find(({ id }) => id === (user.student?.gradeId || 0));

        const score = marksObject[user.id]?.reduce((acc, score) => (acc += ScoreMap[score as keyof typeof ScoreMap]), 0);

        return {
          id: user.id,
          avatar: user.avatarThumb,
          gradeId: user.student?.gradeId || '',
          name: `${user.surname} ${user.name} ${user.patronymic ?? ''}`,
          grade: grade ? `${grade?.level} "${grade?.group}"` : '',
          score,
        };
      }).sort((a, b) => {
        const scoreA = a.score;
        const scoreB = b.score;

        const isEmptyA = scoreA === null || scoreA === undefined;
        const isEmptyB = scoreB === null || scoreB === undefined;

        if (isEmptyA && !isEmptyB) return 1;
        if (!isEmptyA && isEmptyB) return -1;
        if (isEmptyA && isEmptyB) return 0;

        return scoreB - scoreA;
      });

      return list;
    }
  }, [data]);

  if (!grade || !grades || !data || !leaderBoard) {
    return <Spinner className="w-8 h-8" />;
  }

  return (
    <main className="py-2 flex flex-col gap-2 pb-40">
      <h1 className="title px-3">
        Класс {grade.level} {grade.group}
      </h1>

      <table className="flex flex-col bg-white shadow rounded border">
        <thead className="sticky top-0 z-10 flex bg-[#efefef] font-medium shadow py-1 rounded-t">
          <tr className="grid grid-cols-[40px_1fr_8fr_2fr_2fr] w-full">
            <th>
              №
            </th>
            <th>
              Фото
            </th>
            <th className="text-start">
              ФИО
            </th>
            <th>
              Класс
            </th>
            <th>
              Ранг
            </th>
          </tr>
        </thead>

        <tbody className="relative z-0">
          {leaderBoard.map((user, index) => (
            <tr
              key={user.id}
              className={classNames(
                'grid grid-cols-[40px_1fr_8fr_2fr_2fr] w-full py-1',
                (index % 2) && 'bg-gray-50',
              )}
            >
              <td className="flex items-center justify-center">
                {index + 1}.
              </td>
              <td className="flex items-center justify-center">
                <div className="relative z-10 w-12 lg:mb-0">
                  <div>
                    <img
                      className="block w-full h-full rounded-full object-cover border-[2px] border-white"
                      src={user.avatar || '/images/avatar.png'}
                      width={144}
                      height={144}
                      alt={user.name}
                    />
                  </div>
                </div>
              </td>
              <td className="flex items-center text-lg">
                <Link className="text-blue-600" to={generatePath(AppRoute.Users.Show, { id: user.id })}>
                  {user.name}
                </Link>
              </td>
              <td className="flex items-center justify-center text-lg font-medium">
                {user.grade}
              </td>
              <td className="flex items-center justify-center text-xl font-semibold text-blue-700">
                {user.score}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default TeacherGradesShow;
