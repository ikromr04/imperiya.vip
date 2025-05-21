import { RatingCodeToSlug, RatingCodeToText, RatingSlugToCode } from '@/const/ratings';
import { AppRoute } from '@/const/routes';
import { AsyncStatus } from '@/const/store';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchLessonsAction } from '@/store/lessons-slice/lessons-api-actions';
import { fetchMarksAction } from '@/store/marks-slice/marks-api-actions';
import { fetchRatingsAction } from '@/store/ratings-slice/ratings-api-actions';
import { getRatingDates, getRatingsStatus } from '@/store/ratings-slice/ratings-selector';
import { getUsers } from '@/store/users-slice/users-selector';
import { Lesson, Lessons } from '@/types/lessons';
import { Mark, Marks } from '@/types/marks';
import { Rating, RatingCode, Ratings, RatingSlug } from '@/types/ratings';
import { UserId } from '@/types/users';
import { getEducationYearRange } from '@/utils';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import React, { BaseSyntheticEvent, lazy, memo, ReactNode, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { generatePath, Link, useSearchParams } from 'react-router-dom';
import DataTable from './data-table';
import Spinner from '@/components/ui/spinner';
import classNames from 'classnames';
import { RatingStoreDTO, } from '@/dto/ratings';
import { RatingCreateProps } from './rating-create';
import { MarkCreateProps } from './mark-create';
import { MarkStoreDTO } from '@/dto/marks';
import { AttendanceAbbr } from '@/const/marks';

const RatingCreate = lazy(() => import('./rating-create'));
const MarkCreate = lazy(() => import('./mark-create'));

export type Column = {
  id: UserId;
  name: string;
} & Record<string, object | string | number>;

function Journal(): ReactNode {
  const dispatch = useAppDispatch();
  const ratingsStatus = useAppSelector(getRatingsStatus);
  const ratingDates = useAppSelector(getRatingDates);
  const users = useAppSelector(getUsers);

  const [searchParams] = useSearchParams();
  const subjectId = searchParams.get('subjectId');
  const gradeId = searchParams.get('gradeId');
  const yearRange = getEducationYearRange();
  const currentRatingDate = ratingDates?.find(({ years }) => years == yearRange);
  const [lessons, setLessons] = useState<Lessons>();
  const [ratings, setRatings] = useState<Ratings>();
  const [marks, setMarks] = useState<Marks>();

  const [ratingCreateProps, setRatingCreateProps] = useState<RatingCreateProps>();
  const [markCreateProps, setMarkCreateProps] = useState<MarkCreateProps>();

  useEffect(() => {
    if (subjectId && gradeId) {
      dispatch(fetchLessonsAction({
        subjectId: +subjectId,
        gradeId: +gradeId,
        onSuccess: (lessons) => {
          setLessons(lessons);

          dispatch(fetchMarksAction({
            lessons: lessons.map(({ id }) => id),
            onSuccess: (marks) => setMarks(marks),
          }));
        },
      }));
      if (ratingsStatus !== AsyncStatus.Loading) dispatch(fetchRatingsAction({
        years: yearRange,
        subjectId: +subjectId,
        gradeId: +gradeId,
        onSuccess: (ratings) => setRatings(ratings),
      }));
    }
  }, [dispatch, gradeId, ratingsStatus, subjectId, yearRange]);

  const ratingObject = useMemo(() => {
    const object: Record<string, Rating> = {};
    if (ratings) {
      ratings.forEach((rating) => {
        const key = `${rating.studentId}_${RatingSlugToCode[rating.rating as RatingSlug]}`;
        object[key] = rating;
      });
      return object;
    }
  }, [ratings]);

  const markObject = useMemo(() => {
    const object: Record<string, Mark> = {};
    if (marks) {
      marks.forEach((mark) => {
        const key = `${mark.studentId}_${mark.lessonId}`;
        object[key] = mark;
      });
      return object;
    }
  }, [marks]);

  const lessonObject = useMemo(() => {
    const object: Record<string, Lesson> = {};
    if (lessons) {
      lessons.forEach((lesson) => {
        const key = `${lesson.date}_${lesson.hour}_${lesson.id}`;
        object[key] = lesson;
      });
      return object;
    }
  }, [lessons]);

  const headers = useMemo(() => {
    if (currentRatingDate && lessons) {
      const headers = lessons.map((lesson) => `${lesson.date}_${lesson.hour}_${lesson.id}`);
      Object.entries(RatingSlugToCode).forEach(([slug, code]) => {
        if (currentRatingDate[slug as RatingSlug]) headers.push(`${currentRatingDate[slug as RatingSlug]}_${code}`);
      });
      headers.sort();
      return headers;
    }

  }, [currentRatingDate, lessons]);

  const data = useMemo(() => {
    if (headers && users && gradeId && subjectId && marks) {
      return users.filter((user) => user.student?.gradeId === +gradeId).map((user) => {
        const datePerMarks = headers.reduce((acc, header) => {
          if (header.length == 13) {
            const rating = ratingObject?.[`${user.id}_${header.split('_')[1]}`];
            acc[header] = rating;
          } else {
            const mark = markObject?.[`${user.id}_${header.split('_')[2]}`];
            acc[header] = mark;
          }
          return acc;
        }, {} as Record<string, Mark | Rating | undefined>);

        return {
          id: user.id,
          name: `${user.surname} ${user.name}`,
          ...datePerMarks
        };
      });
    }
  }, [gradeId, headers, markObject, marks, ratingObject, subjectId, users]);

  const onRatingCreateButtonClick = useCallback(
    (dto: RatingStoreDTO, studentName: string) => (evt: BaseSyntheticEvent) => {
      const buttonRect = evt.currentTarget.getBoundingClientRect();
      const top = buttonRect.top + 36 + 4;
      const left = buttonRect.left + 36 + 4;

      setRatingCreateProps({
        dto,
        position: { top, left },
        studentName,
        onClose: () => setRatingCreateProps(undefined),
        onSuccess: (createdRating) => setRatings((prev = []) => ([...prev, createdRating])),
      });
    },
    [],
  );

  const onMarkCreateButtonClick = useCallback(
    (dto: MarkStoreDTO, studentName: string) => (evt: BaseSyntheticEvent) => {
      const buttonRect = evt.currentTarget.getBoundingClientRect();
      const top = buttonRect.top + 36 + 4;
      const left = buttonRect.left + 36 + 4;

      setMarkCreateProps({
        dto,
        position: { top, left },
        studentName,
        onClose: () => setMarkCreateProps(undefined),
        onSuccess: (createdMark) => setMarks((prev = []) => ([...prev, createdMark])),
      });
    },
    [],
  );

  const columns: ColumnDef<Column>[] | undefined = useMemo(() => {
    if (headers && gradeId && subjectId && markObject) {
      return [
        {
          id: 'name',
          accessorKey: 'name',
          header: 'Ф.И.',
          size: 180,
          cell: ({ row }) => (
            <Link className="flex items-center px-1 w-max h-max leading-none" to={generatePath(AppRoute.Users.Show, { id: row.original.id })}>
              {row.original.name}
            </Link>
          ),
          meta: { columnClass: 'flex items-center min-w-[180px] max-w-[180px)] md:min-w-[220px] md:max-w-[220px]' }
        },
        ...headers.reduce((acc, header) => {
          if (header.length === 13) {
            const [ratingDate, ratingCode] = header.split('_');

            acc.push({
              id: header,
              accessorKey: header,
              header: RatingCodeToText[+ratingCode as RatingCode],
              cell: ({ row }) => {
                const rating = ratingObject?.[`${row.original.id}_${ratingCode}`];

                if (!rating) {
                  if (dayjs(ratingDate) > dayjs()) return;

                  return (
                    <button
                      className="flex min-w-9 min-h-9 cursor-pointer hover:bg-gray-600/5"
                      type="button"
                      onClick={onRatingCreateButtonClick({
                        rating: RatingCodeToSlug[+ratingCode as RatingCode] as RatingSlug,
                        years: yearRange,
                        student_id: row.original.id,
                        grade_id: +gradeId,
                        subject_id: +subjectId,
                      }, row.original.name)}
                    ></button>
                  );
                }

                return (
                  <div className="flex items-center justify-center min-w-9 min-h-9">
                    {rating.score}
                  </div>
                );
              },
              meta: { columnClass: 'flex items-center justify-end min-w-9 max-w-9 min-h-9 max-h-9' }
            });
          } else {
            const [lessonDate, , lessonId] = header.split('_');

            acc.push({
              id: header,
              accessorKey: header,
              header: lessonDate,
              size: 40,
              cell: ({ row }) => {
                const mark = markObject?.[`${row.original.id}_${lessonId}`];

                if (!mark) {
                  if (dayjs(lessonDate) > dayjs()) return;

                  return (
                    <button
                      className="flex min-w-9 min-h-9 cursor-pointer hover:bg-gray-600/5"
                      type="button"
                      onClick={onMarkCreateButtonClick({
                        attendance: '',
                        lesson_id: +lessonId,
                        student_id: row.original.id,
                      }, row.original.name)}
                    ></button>
                  );
                }

                return (
                  <div className="flex items-center justify-center min-w-9 min-h-9">
                    {mark.score1}
                    {mark.score1 && mark.score2 && '/'}
                    {mark.score2}
                    {!mark.score1 && !mark.score2 && AttendanceAbbr[mark.attendance as keyof typeof AttendanceAbbr]}
                  </div>
                );
              },
              enableSorting: false,
              meta: {
                columnClass: classNames(
                  'flex items-center justify-center min-w-9 max-w-9 min-h-9 max-h-9 border-r',
                  dayjs(lessonDate).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD') && '!bg-green-50'
                ),
              }
            });
          }

          return acc;
        }, [] as ColumnDef<Column>[])
      ];
    }
  }, [gradeId, headers, markObject, onMarkCreateButtonClick, onRatingCreateButtonClick, ratingObject, subjectId, yearRange]);

  if (!gradeId || !subjectId) return;

  if (!data || !columns) {
    return <Spinner className="w-8 h-8" />;
  }

  return (
    <>
      {lessonObject && (
        <DataTable
          data={data}
          columns={columns}
          setLessons={setLessons}
          lessonObject={lessonObject}
        />
      )}

      {ratingCreateProps && (
        <Suspense fallback={<Spinner className="w-8 h-8" />}>
          <RatingCreate {...ratingCreateProps} />
        </Suspense>
      )}

      {markCreateProps && (
        <Suspense fallback={<Spinner className="w-8 h-8" />}>
          <MarkCreate {...markCreateProps} />
        </Suspense>
      )}
    </>
  );
}

export default memo(Journal);
