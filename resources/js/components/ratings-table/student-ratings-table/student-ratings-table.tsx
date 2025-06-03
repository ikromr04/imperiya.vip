import { RatingSlugToCode, RatingSlugToText } from '@/const/ratings';
import { AsyncStatus } from '@/const/store';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchAuthRatingsAction } from '@/store/auth-slice/auth-api-actions';
import { fetchSubjectsAction } from '@/store/subjects-slice/subjects-api-actions';
import { getSubjects, getSubjectsStatus } from '@/store/subjects-slice/subjects-selector';
import { Ratings, RatingSlug } from '@/types/ratings';
import { SubjectId } from '@/types/subjects';
import { getEducationYearRange } from '@/utils';
import { ColumnDef } from '@tanstack/react-table';
import classNames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import DataTable from './data-table';
import Spinner from '@/components/ui/spinner';
import { User } from '@/types/users';
import { fetchUserRatingsAction } from '@/store/users-slice/users-api-actions';

export type Column = {
  id: SubjectId;
  name: string;
} & Record<string, object | string | number>;

type StudentRatingsTableProps = {
  user?: User;
};

function StudentRatingsTable({
  user,
}: StudentRatingsTableProps): JSX.Element {
  const dispatch = useAppDispatch();
  const subjectsStatus = useAppSelector(getSubjectsStatus);
  const subjects = useAppSelector(getSubjects);
  const [subjectIds, setSubjectIds] = useState<SubjectId[]>();
  const [ratings, setRatings] = useState<Ratings>();

  useEffect(() => {
    if (subjectsStatus === AsyncStatus.Idle) dispatch(fetchSubjectsAction());
  }, [dispatch, subjectsStatus]);

  useEffect(() => {
    if (!ratings && user) dispatch(fetchUserRatingsAction({
      id: user.id,
      years: getEducationYearRange(),
      onSuccess: (data) => {
        setSubjectIds(data.subjectIds);
        setRatings(data.ratings);
      },
    }));
    if (!ratings && !user) dispatch(fetchAuthRatingsAction({
      years: getEducationYearRange(),
      onSuccess: (data) => {
        setSubjectIds(data.subjectIds);
        setRatings(data.ratings);
      },
    }));
  }, [dispatch, ratings, subjectIds, user]);

  const ratingObject = useMemo(() => {
    const object: Record<string, number> = {};
    if (ratings) {
      ratings.forEach((rating) => {
        const key = `${rating.subjectId}_${rating.rating}`;
        object[key] = rating.score;
      });
      return object;
    }
  }, [ratings]);

  const headers = Object.keys(RatingSlugToCode);

  const data = useMemo(() => {
    if (subjects) {
      return subjects.filter((subject) => subjectIds?.includes(subject.id)).map((subject) => {
        const ratingPerScores = headers.reduce((acc, ratingSlug) => {
          const rating = ratingObject?.[`${subject.id}_${ratingSlug}`];

          acc[ratingSlug] = rating;
          return acc;
        }, {} as Record<string, number | undefined>);

        return {
          id: subject.id,
          name: subject.name,
          ...ratingPerScores
        };
      });
    }
  }, [headers, ratingObject, subjectIds, subjects]);

  const columns: ColumnDef<Column>[] | undefined = useMemo(() => {
    if (ratingObject) {
      return [
        {
          id: 'name',
          accessorKey: 'name',
          header: 'Предмет',
          size: 180,
          meta: { columnClass: 'flex items-center min-w-[180px] max-w-[180px)] md:min-w-[220px] md:max-w-[220px]' }
        },
        ...headers.reduce((acc, header) => {
          acc.push({
            id: header,
            accessorKey: header,
            header: RatingSlugToText[header as RatingSlug],
            size: 40,
            enableSorting: false,
            meta: {
              columnClass: classNames(
                'flex items-center justify-center min-w-9 max-w-9 min-h-9 max-h-9 border-r',
              ),
            }
          });

          return acc;
        }, [] as ColumnDef<Column>[])
      ];
    }
  }, [headers, ratingObject]);

  if (!data || !columns) {
    return <Spinner className="w-8 h-8" />;
  }

  return <DataTable data={data} columns={columns} />;
}

export default StudentRatingsTable;
