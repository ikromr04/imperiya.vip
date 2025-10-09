import SelectField from '@/components/ui/form-controls/select-field';
import Spinner from '@/components/ui/spinner';
import { useAppDispatch } from '@/hooks';
import { fetchLeadershipDataAction } from '@/store/leadership-slice/leadership-api-actions';
import classNames from 'classnames';
import Pusher from 'pusher-js';
import React, { useEffect, useMemo, useState } from 'react';
import { Data } from './leadership-page';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '@/const/routes';
import { ScoreMap } from '@/const/leadership';

function DirectorLeadership(): JSX.Element {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<Data>();
  const [grade, setGrade] = useState('0');

  useEffect(() => {
    if (!data) dispatch(fetchLeadershipDataAction({
      onSuccess: (data) => setData(data),
    }));
  }, [data, dispatch]);

  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher('4176f4643166a8116c5b', {
      cluster: 'ap1',
    });

    const channel = pusher.subscribe('mark.channel');

    channel.bind('mark.events', () => {
      dispatch(fetchLeadershipDataAction({
        onSuccess: (data) => setData(data),
      }));
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [dispatch]);

  let leaderBoard = useMemo(() => {
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

  if (!data || !leaderBoard) return <Spinner className="w-4 h-4 mt-4" />;

  if (grade !== '0') {
    leaderBoard = leaderBoard.filter((user) => String(user.gradeId) === grade);
  }

  return (
    <main className="py-2 flex flex-col gap-2 pb-40">
      <header className="relative z-20 flex justify-between items-end">
        <h1 className="title px-3 !leading-none">Рейтинг</h1>

        <SelectField
          className="w-40"
          options={[
            { value: '0', label: 'Все классы' },
            ...data.grades.map((grade) => ({ value: grade.id.toString(), label: `${grade.level} ${grade.group}` }))
          ]}
          value={grade}
          onChange={(value) => setGrade(value)}
          notNull
        />
      </header>

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

export default DirectorLeadership;
