import { AppRoute } from '@/const/routes';
import { GradeId } from '@/types/grades';
import { Users } from '@/types/users';
import { ColumnDef } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { Journal, Lessons } from '@/types/lessons';
import Spinner from '../ui/spinner';
import { useAppDispatch, useAppSelector } from '@/hooks';
import DataTable from '../ui/data-table/data-table';
import dayjs from 'dayjs';
import { SubjectId } from '@/types/subjects';
import { fetchJournalAction, fetchLessonsTypesAction } from '@/store/lessons-slice/lessons-api-actions';
import { Mark } from '@/types/marks';
import MarkCreate from './mark-create';
import MarkEdit from './mark-edit';
import LessonsJournalEditForm from '../forms/lessons/lessons-journal-edit-form';
import { getLessonsTypes } from '@/store/lessons-slice/lessons-selector';
import { Rating, RatingDate, Ratings } from '@/types/ratings';
import { RatingName } from '@/const/ratings';
import RatingCreate from './rating-create';
import { fetchRatingsAction } from '@/store/ratings-slice/ratings-api-actions';
import RatingEdit from './rating-edit';

type JournalTableProps = {
  students: Users;
  subjectId: SubjectId;
  gradeId: GradeId;
  ratingDate: RatingDate | undefined;
};

function JournalTable({
  students,
  subjectId,
  gradeId,
  ratingDate,
}: JournalTableProps): JSX.Element {
  const dispatch = useAppDispatch();
  const lessonsTypes = useAppSelector(getLessonsTypes);
  const [journal, setJournal] = useState<Journal[] | null>(null);
  const [lessons, setLessons] = useState<Lessons | null>(null);
  const [ratings, setRatings] = useState<Ratings | null>(null);

  useEffect(() => {
    if (!lessonsTypes.data && !lessonsTypes.isFetching) dispatch(fetchLessonsTypesAction());
    if (ratingDate && !ratings) dispatch(fetchRatingsAction({
      dto: {
        years: ratingDate.years,
        gradeId,
        subjectId,
      },
      onSuccess: (ratings) => setRatings(ratings),
    }));

    if (!journal) dispatch(fetchJournalAction({
      subjectId,
      gradeId,
      onSuccess: (lessons) => {
        setLessons(lessons);
        setJournal(students.map((student) => {
          const dates = lessons.reduce((acc, item) => {
            const mark = item.marks?.find((mark) => mark.studentId === student.id);
            acc[item.date] = mark || '';

            return acc;
          }, {} as Journal);

          return {
            ...dates,
            id: student.id,
            name: `${student.surname} ${student.name}`,
          };
        }));
      },
    }));
  }, [dispatch, gradeId, journal, lessonsTypes.data, lessonsTypes.isFetching, ratingDate, ratings, students, subjectId]);

  if (!journal || !lessonsTypes.data || !lessons || !ratings) {
    return <Spinner className="w-8 h-8" />;
  }

  const ratingRenderedState = {
    quarter1: false,
    quarter2: false,
    semester1: false,
    quarter3: false,
    quarter4: false,
    semester2: false,
    annual: false,
    assessment: false,
    final: false,
  };

  const columns: ColumnDef<Journal>[] = [
    {
      id: 'name',
      accessorKey: 'name',
      header: 'ФИО',
      size: 240,
      cell: ({ row }) => (
        <Link to={generatePath(AppRoute.Users.Show, { id: row.original.id })}>
          {row.original.name}
        </Link>
      ),
      meta: {
        columnClass: 'truncate',
        thClass: 'items-end h-24',
      }
    },
    ...lessons.reduce((acc, item) => {
      if (ratingDate?.quarter1 && ratingDate.quarter1 < item.date && !ratingRenderedState.quarter1) {
        ratingRenderedState.quarter1 = true;

        acc.push({
          id: 'quarter1',
          accessorKey: 'quarter1',
          header: RatingName['quarter1'],
          size: 40,
          cell: ({ row }) => {
            const rating: Rating | undefined = ratings.find((rating) => (
              rating.rating === 'quarter1' &&
              rating.studentId === row.original.id
            ));

            if (!rating) {
              if (dayjs(item.date) > dayjs()) return null;

              return (
                <RatingCreate
                  studentName={row.original.name}
                  createDTO={{
                    years: ratingDate.years,
                    rating: 'quarter1',
                    studentId: row.original.id,
                    gradeId,
                    subjectId,
                  }}
                />
              );
            }

            return (
              <div className="flex items-center justify-center -m-2 p-2">
                <RatingEdit
                  studentName={row.original.name}
                  rating={rating}
                />
              </div>
            );
          },
          enableSorting: false,
          meta: {
            columnClass: 'border-r text-blue-600',
            thClass: 'items-end font-medium text-blue-600',
            renderHeader: () => (
              <span className="relative flex items-end w-6 h-20">
                <span className="absolute w-24 h-10 top-[calc(100%+8px)] -left-2 -rotate-90 origin-top-left flex items-center justify-center">
                  {RatingName['quarter1']}
                </span>
              </span>
            ),
          }
        });
      }

      if (ratingDate?.quarter2 && ratingDate.quarter2 < item.date && !ratingRenderedState.quarter2) {
        ratingRenderedState.quarter2 = true;

        acc.push({
          id: 'quarter2',
          accessorKey: 'quarter2',
          header: RatingName['quarter2'],
          size: 40,
          cell: ({ row }) => {
            const rating: Rating | undefined = ratings.find((rating) => (
              rating.rating === 'quarter2' &&
              rating.studentId === row.original.id
            ));

            if (!rating) {
              if (dayjs(item.date) > dayjs()) return null;

              return (
                <RatingCreate
                  studentName={row.original.name}
                  createDTO={{
                    years: ratingDate.years,
                    rating: 'quarter2',
                    studentId: row.original.id,
                    gradeId,
                    subjectId,
                  }}
                />
              );
            }

            return (
              <div className="flex items-center justify-center -m-2 p-2">
                <RatingEdit
                  studentName={row.original.name}
                  rating={rating}
                />
              </div>
            );
          },
          enableSorting: false,
          meta: {
            columnClass: 'border-r text-blue-600',
            thClass: 'items-end font-medium text-blue-600',
            renderHeader: () => (
              <span className="relative flex items-end w-6 h-20">
                <span className="absolute w-24 h-10 top-[calc(100%+8px)] -left-2 -rotate-90 origin-top-left flex items-center justify-center">
                  {RatingName['quarter2']}
                </span>
              </span>
            ),
          }
        });
      }

      if (ratingDate?.semester1 && ratingDate.semester1 < item.date && !ratingRenderedState.semester1) {
        ratingRenderedState.semester1 = true;

        acc.push({
          id: 'semester1',
          accessorKey: 'semester1',
          header: RatingName['semester1'],
          size: 40,
          cell: ({ row }) => {
            const rating: Rating | undefined = ratings.find((rating) => (
              rating.rating === 'semester1' &&
              rating.studentId === row.original.id
            ));

            if (!rating) {
              if (dayjs(item.date) > dayjs()) return null;

              return (
                <RatingCreate
                  studentName={row.original.name}
                  createDTO={{
                    years: ratingDate.years,
                    rating: 'semester1',
                    studentId: row.original.id,
                    gradeId,
                    subjectId,
                  }}
                />
              );
            }

            return (
              <div className="flex items-center justify-center -m-2 p-2">
                <RatingEdit
                  studentName={row.original.name}
                  rating={rating}
                />
              </div>
            );
          },
          enableSorting: false,
          meta: {
            columnClass: 'border-r text-blue-600',
            thClass: 'items-end font-medium text-blue-600',
            renderHeader: () => (
              <span className="relative flex items-end w-6 h-20">
                <span className="absolute w-24 h-10 top-[calc(100%+8px)] -left-2 -rotate-90 origin-top-left flex items-center justify-center">
                  {RatingName['semester1']}
                </span>
              </span>
            ),
          }
        });
      }

      if (ratingDate?.quarter3 && ratingDate.quarter3 < item.date && !ratingRenderedState.quarter3) {
        ratingRenderedState.quarter3 = true;

        acc.push({
          id: 'quarter3',
          accessorKey: 'quarter3',
          header: RatingName['quarter3'],
          size: 40,
          cell: ({ row }) => {
            const rating: Rating | undefined = ratings.find((rating) => (
              rating.rating === 'quarter3' &&
              rating.studentId === row.original.id
            ));

            if (!rating) {
              if (dayjs(item.date) > dayjs()) return null;

              return (
                <RatingCreate
                  studentName={row.original.name}
                  createDTO={{
                    years: ratingDate.years,
                    rating: 'quarter3',
                    studentId: row.original.id,
                    gradeId,
                    subjectId,
                  }}
                />
              );
            }

            return (
              <div className="flex items-center justify-center -m-2 p-2">
                <RatingEdit
                  studentName={row.original.name}
                  rating={rating}
                />
              </div>
            );
          },
          enableSorting: false,
          meta: {
            columnClass: 'border-r text-blue-600',
            thClass: 'items-end font-medium text-blue-600',
            renderHeader: () => (
              <span className="relative flex items-end w-6 h-20">
                <span className="absolute w-24 h-10 top-[calc(100%+8px)] -left-2 -rotate-90 origin-top-left flex items-center justify-center">
                  {RatingName['quarter3']}
                </span>
              </span>
            ),
          }
        });
      }

      if (ratingDate?.quarter4 && ratingDate.quarter4 < item.date && !ratingRenderedState.quarter4) {
        ratingRenderedState.quarter4 = true;

        acc.push({
          id: 'quarter4',
          accessorKey: 'quarter4',
          header: RatingName['quarter4'],
          size: 40,
          cell: ({ row }) => {
            const rating: Rating | undefined = ratings.find((rating) => (
              rating.rating === 'quarter4' &&
              rating.studentId === row.original.id
            ));

            if (!rating) {
              if (dayjs(item.date) > dayjs()) return null;

              return (
                <RatingCreate
                  studentName={row.original.name}
                  createDTO={{
                    years: ratingDate.years,
                    rating: 'quarter4',
                    studentId: row.original.id,
                    gradeId,
                    subjectId,
                  }}
                />
              );
            }

            return (
              <div className="flex items-center justify-center -m-2 p-2">
                <RatingEdit
                  studentName={row.original.name}
                  rating={rating}
                />
              </div>
            );
          },
          enableSorting: false,
          meta: {
            columnClass: 'border-r text-blue-600',
            thClass: 'items-end font-medium text-blue-600',
            renderHeader: () => (
              <span className="relative flex items-end w-6 h-20">
                <span className="absolute w-24 h-10 top-[calc(100%+8px)] -left-2 -rotate-90 origin-top-left flex items-center justify-center">
                  {RatingName['quarter4']}
                </span>
              </span>
            ),
          }
        });
      }

      if (ratingDate?.semester2 && ratingDate.semester2 < item.date && !ratingRenderedState.semester2) {
        ratingRenderedState.semester2 = true;

        acc.push({
          id: 'semester2',
          accessorKey: 'semester2',
          header: RatingName['semester2'],
          size: 40,
          cell: ({ row }) => {
            const rating: Rating | undefined = ratings.find((rating) => (
              rating.rating === 'semester2' &&
              rating.studentId === row.original.id
            ));

            if (!rating) {
              if (dayjs(item.date) > dayjs()) return null;

              return (
                <RatingCreate
                  studentName={row.original.name}
                  createDTO={{
                    years: ratingDate.years,
                    rating: 'semester2',
                    studentId: row.original.id,
                    gradeId,
                    subjectId,
                  }}
                />
              );
            }

            return (
              <div className="flex items-center justify-center -m-2 p-2">
                <RatingEdit
                  studentName={row.original.name}
                  rating={rating}
                />
              </div>
            );
          },
          enableSorting: false,
          meta: {
            columnClass: 'border-r text-blue-600',
            thClass: 'items-end font-medium text-blue-600',
            renderHeader: () => (
              <span className="relative flex items-end w-6 h-20">
                <span className="absolute w-24 h-10 top-[calc(100%+8px)] -left-2 -rotate-90 origin-top-left flex items-center justify-center">
                  {RatingName['semester2']}
                </span>
              </span>
            ),
          }
        });
      }

      if (ratingDate?.annual && ratingDate.annual < item.date && !ratingRenderedState.annual) {
        ratingRenderedState.annual = true;

        acc.push({
          id: 'annual',
          accessorKey: 'annual',
          header: RatingName['annual'],
          size: 40,
          cell: ({ row }) => {
            const rating: Rating | undefined = ratings.find((rating) => (
              rating.rating === 'annual' &&
              rating.studentId === row.original.id
            ));

            if (!rating) {
              if (dayjs(item.date) > dayjs()) return null;

              return (
                <RatingCreate
                  studentName={row.original.name}
                  createDTO={{
                    years: ratingDate.years,
                    rating: 'annual',
                    studentId: row.original.id,
                    gradeId,
                    subjectId,
                  }}
                />
              );
            }

            return (
              <div className="flex items-center justify-center -m-2 p-2">
                <RatingEdit
                  studentName={row.original.name}
                  rating={rating}
                />
              </div>
            );
          },
          enableSorting: false,
          meta: {
            columnClass: 'border-r text-blue-600',
            thClass: 'items-end font-medium text-blue-600',
            renderHeader: () => (
              <span className="relative flex items-end w-6 h-20">
                <span className="absolute w-24 h-10 top-[calc(100%+8px)] -left-2 -rotate-90 origin-top-left flex items-center justify-center">
                  {RatingName['annual']}
                </span>
              </span>
            ),
          }
        });
      }

      if (ratingDate?.assessment && ratingDate.assessment < item.date && !ratingRenderedState.assessment) {
        ratingRenderedState.assessment = true;

        acc.push({
          id: 'assessment',
          accessorKey: 'assessment',
          header: RatingName['assessment'],
          size: 40,
          cell: ({ row }) => {
            const rating: Rating | undefined = ratings.find((rating) => (
              rating.rating === 'assessment' &&
              rating.studentId === row.original.id
            ));

            if (!rating) {
              if (dayjs(item.date) > dayjs()) return null;

              return (
                <RatingCreate
                  studentName={row.original.name}
                  createDTO={{
                    years: ratingDate.years,
                    rating: 'assessment',
                    studentId: row.original.id,
                    gradeId,
                    subjectId,
                  }}
                />
              );
            }

            return (
              <div className="flex items-center justify-center -m-2 p-2">
                <RatingEdit
                  studentName={row.original.name}
                  rating={rating}
                />
              </div>
            );
          },
          enableSorting: false,
          meta: {
            columnClass: 'border-r text-blue-600',
            thClass: 'items-end font-medium text-blue-600',
            renderHeader: () => (
              <span className="relative flex items-end w-6 h-20">
                <span className="absolute w-24 h-10 top-[calc(100%+8px)] -left-2 -rotate-90 origin-top-left flex items-center justify-center">
                  {RatingName['assessment']}
                </span>
              </span>
            ),
          }
        });
      }

      if (ratingDate?.final && ratingDate.final < item.date && !ratingRenderedState.final) {
        ratingRenderedState.final = true;

        acc.push({
          id: 'final',
          accessorKey: 'final',
          header: RatingName['final'],
          size: 40,
          cell: ({ row }) => {
            const rating: Rating | undefined = ratings.find((rating) => (
              rating.rating === 'final' &&
              rating.studentId === row.original.id
            ));

            if (!rating) {
              if (dayjs(item.date) > dayjs()) return null;

              return (
                <RatingCreate
                  studentName={row.original.name}
                  createDTO={{
                    years: ratingDate.years,
                    rating: 'final',
                    studentId: row.original.id,
                    gradeId,
                    subjectId,
                  }}
                />
              );
            }

            return (
              <div className="flex items-center justify-center -m-2 p-2">
                <RatingEdit
                  studentName={row.original.name}
                  rating={rating}
                />
              </div>
            );
          },
          enableSorting: false,
          meta: {
            columnClass: 'border-r text-blue-600',
            thClass: 'items-end font-medium text-blue-600',
            renderHeader: () => (
              <span className="relative flex items-end w-6 h-20">
                <span className="absolute w-24 h-10 top-[calc(100%+8px)] -left-2 -rotate-90 origin-top-left flex items-center justify-center">
                  {RatingName['final']}
                </span>
              </span>
            ),
          }
        });
      }

      acc.push({
        id: item.date,
        accessorKey: item.date,
        header: item.date,
        size: 40,
        cell: ({ row }) => {
          const mark: Mark = row.original[item.date] as Mark;

          if (!mark) {
            if (dayjs(item.date) > dayjs()) return null;

            return (
              <MarkCreate
                studentName={row.original.name}
                studentId={row.original.id}
                lessonId={item.id}
              />
            );
          }

          return (
            <div className="flex items-center justify-center -m-2 p-2">
              <MarkEdit mark={mark} studentName={row.original.name} />
            </div>
          );
        },
        enableSorting: false,
        meta: {
          columnClass: dayjs(item.date).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD') ? '!bg-green-50 border-r' : 'border-r',
          thClass: 'items-end font-medium',
          renderHeader: () => (
            <span className="relative flex items-end w-6 h-20">
              <span className="absolute w-24 h-10 top-[calc(100%+8px)] -left-2 -rotate-90 origin-top-left flex items-center justify-center">
                {item.date}
              </span>
            </span>
          ),
          renderFilter: (_, setIsOpen) => (
            <LessonsJournalEditForm
              lesson={item}
              types={lessonsTypes.data || []}
              setIsOpen={setIsOpen}
            />
          ),
        }
      });

      return acc;
    }, [] as ColumnDef<Journal>[])
  ];

  return (
    <DataTable
      data={journal}
      columns={columns}
      pageSize={50}
      sortingState={[{
        id: 'name',
        desc: false,
      }]}
    />
  );
}

export default JournalTable;
