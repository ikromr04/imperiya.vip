import { RatingCodeToSlug, RatingCodeToText, RatingSlugToCode } from '@/const/ratings';
import { AppRoute } from '@/const/routes';
import { AsyncStatus } from '@/const/store';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchLessonsAction } from '@/store/lessons-slice/lessons-api-actions';
import { fetchMarksAction, storeMarkAction, updateMarkAction } from '@/store/marks-slice/marks-api-actions';
import { fetchRatingsAction, storeRatingAction, updateRatingAction } from '@/store/ratings-slice/ratings-api-actions';
import { getRatingDates, getRatingsStatus } from '@/store/ratings-slice/ratings-selector';
import { getUsers } from '@/store/users-slice/users-selector';
import { Lesson, Lessons } from '@/types/lessons';
import { Mark, Marks } from '@/types/marks';
import { Rating, RatingCode, Ratings, RatingSlug } from '@/types/ratings';
import { UserId } from '@/types/users';
import { getEducationYearRange } from '@/utils';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import React, { BaseSyntheticEvent, memo, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { generatePath, Link, useSearchParams } from 'react-router-dom';
import DataTable from './data-table';
import Spinner from '@/components/ui/spinner';
import classNames from 'classnames';
import { RatingStoreDTO, RatingUpdateDTO } from '@/dto/ratings';
import { MarkStoreDTO, MarkUpdateDTO } from '@/dto/marks';
import { toast } from 'react-toastify';

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
  const [comment, setComment] = useState<string>();

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

  const ratingLessonIdsObject = useMemo(() => {
    if (headers) {
      const object = headers.reduce((acc, header) => {
        if (header.length === 13) {
          const ratingCode = Number(header.split('_')[1]);
          acc.data[ratingCode] = acc.lessonIds;
          acc.lessonIds = [];
        } else {
          const lessonId = Number(header.split('_')[2]);
          acc.lessonIds.push(lessonId);
        }
        return acc;
      }, {
        lessonIds: [],
        data: {},
      } as {
        lessonIds: number[],
        data: Record<number, number[]>,
      });

      return object;
    }
  }, [headers]);

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

  const onRatingCreateInputBlur = useCallback(
    (dto: RatingStoreDTO) => async (evt: BaseSyntheticEvent) => {
      const value = +evt.target.value.trim();

      if (value && value >= 1 && value <= 10 && value !== +evt.target.defaultValue) {
        evt.target.classList.add('opacity-50');
        dto.score = value;

        await dispatch(storeRatingAction({
          dto,
          onSuccess: (createdRating) => setRatings((prev = []) => ([...prev, createdRating])),
          onValidationError: (error) => toast.error(error.message),
          onFail: (message) => toast.success(message),
        }));

        evt.target.classList.remove('opacity-50');
      } else {
        evt.target.value = evt.target.defaultValue;
        return;
      }
    },
    [dispatch],
  );

  const onRatingEditInputBlur = useCallback(
    (dto: RatingUpdateDTO) => async (evt: BaseSyntheticEvent) => {
      const value = +evt.target.value.trim();

      if (value && value >= 1 && value <= 10 && dto.score !== value) {
        evt.target.classList.add('opacity-50');
        dto.score = value;

        await dispatch(updateRatingAction({
          dto,
          onSuccess: (updatedRating) => setRatings((prev = []) => {
            const ratingIndex = prev.findIndex((rating) => rating.id === updatedRating.id);

            if (ratingIndex !== -1) {
              prev[ratingIndex] = updatedRating;
            }

            return [...prev];
          }),
          onValidationError: (error) => toast.error(error.message),
          onFail: (message) => toast.error(message),
        }));

        evt.target.classList.remove('opacity-50');
      } else {
        evt.target.value = evt.target.defaultValue;
        return;
      }
    },
    [dispatch],
  );

  const onMarkCreateInputBlur = useCallback(
    (dto: MarkStoreDTO) => async (evt: BaseSyntheticEvent) => {
      const value = evt.target.value.toLowerCase().trim();

      if (value === 'н') {
        dto.attendance = 'A';
      } else {
        const [scores, comment] = value.split(/ (.+)/);
        const [score1, score2] = scores.split('/');

        if (!(+score1 >= 1 && +score1 <= 10)) {
          evt.target.value = '';
          return;
        }
        if (score2 && !(+score2 >= 1 && +score2 <= 10)) {
          evt.target.value = '';
          return;
        }
        dto.score_1 = +score1;
        dto.score_2 = +score2 || undefined;
        dto.comment = comment?.trim();
        dto.attendance = 'P';
      }

      evt.target.classList.add('opacity-50');

      await dispatch(storeMarkAction({
        dto,
        onSuccess: (createdMark) => setMarks((prev = []) => ([...prev, createdMark])),
        onFail: (message) => toast.success(message),
      }));

      evt.target.classList.remove('opacity-50');
    },
    [dispatch],
  );

  const onMarkEditInputBlur = useCallback(
    (dto: MarkUpdateDTO) => async (evt: BaseSyntheticEvent) => {
      const value = evt.target.value.toLowerCase().trim();
      const mark = JSON.parse(JSON.stringify(dto));

      const [scores, comment] = value.split(/ (.+)/);
      const [score1, score2] = scores.split('/');

      if (value === 'н') {
        dto.attendance = 'A';
        dto.score_1 = null;
        dto.score_2 = null;
        dto.comment = null;
      } else if (value === 'п') {
        dto.attendance = 'P';
        dto.score_1 = null;
        dto.score_2 = null;
        dto.comment = comment ? comment.trim() : null;
      } else {
        if (!(+score1 >= 1 && +score1 <= 10)) {
          evt.target.value = evt.target.defaultValue;
          setComment(undefined);
          return;
        }
        if (score2 && !(+score2 >= 1 && +score2 <= 10)) {
          evt.target.value = evt.target.defaultValue;
          setComment(undefined);
          return;
        }
        dto.score_1 = +score1;
        dto.score_2 = +score2 || null;
        if (comment) {
          dto.comment = comment.trim();
        }
        dto.attendance = 'P';
      }

      evt.target.classList.add('opacity-50');

      if (JSON.stringify(mark) !== JSON.stringify(dto)) {
        await dispatch(updateMarkAction({
          dto,
          onSuccess: (updatedMark) => setMarks((prev = []) => {
            const markIndex = prev.findIndex((mark) => mark.id === updatedMark.id);
            if (markIndex !== -1) {
              prev[markIndex] = updatedMark;
            }

            return [...prev];
          }),
          onFail: (message) => toast.success(message),
        }));
      }

      evt.target.classList.remove('opacity-50');
      setComment(undefined);
    },
    [dispatch],
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
            const [, ratingCode] = header.split('_');

            acc.push({
              id: header,
              accessorKey: header,
              header: RatingCodeToText[+ratingCode as RatingCode],
              cell: ({ row }) => {
                const rating = ratingObject?.[`${row.original.id}_${ratingCode}`];

                if (!rating) {
                  let markSum = 0;
                  let markCount = 0;
                  let lessonIds = [];

                  if (ratingCode === '93') {
                    lessonIds = [...(ratingLessonIdsObject?.data[91] || []), ...(ratingLessonIdsObject?.data[92] || []), ...(ratingLessonIdsObject?.data[93] || [])];
                  } else if (ratingCode === '96') {
                    lessonIds = [...(ratingLessonIdsObject?.data[94] || []), ...(ratingLessonIdsObject?.data[95] || []), ...(ratingLessonIdsObject?.data[96] || [])];
                  } else if (ratingCode === '97') {
                    lessonIds = [
                      ...(ratingLessonIdsObject?.data[91] || []), ...(ratingLessonIdsObject?.data[92] || []), ...(ratingLessonIdsObject?.data[93] || []),
                      ...(ratingLessonIdsObject?.data[94] || []), ...(ratingLessonIdsObject?.data[95] || []), ...(ratingLessonIdsObject?.data[96] || [])
                    ];
                  } else {
                    lessonIds = ratingLessonIdsObject?.data[+ratingCode] || [];
                  }

                  marks?.map((mark) => {
                    if (lessonIds?.includes(mark.lessonId) && mark.studentId === row.original.id) {
                      if (mark.score1) {
                        markSum = markSum + mark.score1;
                        markCount = markCount + 1;
                      }
                      if (mark.score2) {
                        markSum = markSum + mark.score2;
                        markCount = markCount + 1;
                      }
                    }
                  });

                  const recommendedScore = (markSum / markCount) || 0;
                  const defaultValue = !['98', '99'].includes(ratingCode) && recommendedScore.toFixed(2) || '';

                  return (
                    <input
                      className="flex justify-center items-center text-center min-w-9 min-h-9 cursor-pointer hover:bg-blue-50 bg-transparent focus:outline-0 text-blue-500 placeholder:text-blue-300"
                      type="number"
                      onBlur={onRatingCreateInputBlur({
                        rating: RatingCodeToSlug[+ratingCode as RatingCode] as RatingSlug,
                        years: yearRange,
                        student_id: row.original.id,
                        grade_id: +gradeId,
                        subject_id: +subjectId,
                      })}
                      placeholder={defaultValue}
                    />
                  );
                }

                return (
                  <input
                    className="flex justify-center items-center text-center font-semibold text-blue-500 min-w-9 min-h-9 cursor-pointer hover:bg-blue-50 bg-transparent focus:outline-0"
                    type="number"
                    onBlur={onRatingEditInputBlur({
                      id: rating.id,
                      score: rating.score,
                    })}
                    defaultValue={rating.score}
                  />
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
                    <input
                      className="flex justify-center items-center text-center min-w-9 min-h-9 cursor-pointer hover:bg-gray-600/5 bg-transparent focus:outline-0"
                      onBlur={onMarkCreateInputBlur({
                        attendance: '',
                        lesson_id: +lessonId,
                        student_id: row.original.id,
                      })}
                    />
                  );
                }

                let value = '';

                if (mark.score1 || mark.score2) {
                  const score1 = mark.score1?.toString() ?? '';
                  const score2 = mark.score2?.toString() ?? '';
                  value = score1 && score2 ? `${score1}/${score2}` : score1 || score2;
                } else if (mark.attendance === 'A') {
                  value = 'н';
                }

                return (
                  <input
                    className="flex justify-center items-center text-center min-w-9 min-h-9 cursor-pointer hover:bg-gray-600/5 bg-transparent focus:outline-0"
                    onBlur={onMarkEditInputBlur({
                      id: mark.id,
                      score_1: mark.score1,
                      score_2: mark.score2,
                      attendance: mark.attendance,
                      comment: mark.comment,
                    })}
                    onFocus={() => setComment(mark.comment)}
                    defaultValue={value}
                  />
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
  }, [gradeId, headers, markObject, marks, onMarkCreateInputBlur, onMarkEditInputBlur, onRatingCreateInputBlur, onRatingEditInputBlur, ratingLessonIdsObject?.data, ratingObject, subjectId, yearRange]);

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

      {comment && (
        <div className="fixed right-1 bottom-1 m-0 bg-white py-1 px-2 border">{comment}</div>
      )}
    </>
  );
}

export default memo(Journal);
