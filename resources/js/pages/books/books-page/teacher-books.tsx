import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import DataTable from '@/components/ui/data-table/data-table';
import Spinner from '@/components/ui/spinner';
import { ColumnDef } from '@tanstack/react-table';
import { AsyncStatus } from '@/const/store';
import { getBookCategories, getBookCategoriesStatus, getBooks, getBooksStatus } from '@/store/books-slice/books-selector';
import { Book } from '@/types/books';
import { fetchBookCategoriesAction, fetchBooksAction } from '@/store/books-slice/books-api-actions';
import { AccessText } from '@/const/books';
import { Link } from 'react-router-dom';

function TeacherBooks(): JSX.Element {
  const dispatch = useAppDispatch();

  const booksStatus = useAppSelector(getBooksStatus);
  const categoriesStatus = useAppSelector(getBookCategoriesStatus);

  const books = useAppSelector(getBooks);
  const categories = useAppSelector(getBookCategories);

  useEffect(() => {
    if (booksStatus === AsyncStatus.Idle) dispatch(fetchBooksAction());
    if (categoriesStatus === AsyncStatus.Idle) dispatch(fetchBookCategoriesAction());
  }, [booksStatus, categoriesStatus, dispatch]);

  const columns: ColumnDef<Book>[] = [
    {
      id: 'title',
      accessorKey: 'title',
      header: 'Название',
      size: 360,
    },
    {
      id: 'category',
      accessorKey: 'category',
      header: 'Категория',
      size: 360,
      cell: ({ row }) => categories?.find(({ id }) => +id === +row.original.categoryId)?.title,
      sortingFn: (rowA, rowB) => {
        const gradeA = categories?.find(({ id }) => +id === +rowA.original.categoryId)?.title || '';
        const gradeB = categories?.find(({ id }) => +id === +rowB.original.categoryId)?.title || '';

        return gradeA.localeCompare(gradeB);
      },
    },
    {
      id: 'access',
      accessorKey: 'access',
      header: 'Доступность',
      size: 200,
      cell: ({ row }) => AccessText[row.original.access],
    },
    {
      id: 'lang',
      accessorKey: 'lang',
      header: 'Язык',
      size: 160,
    },
    {
      id: 'link',
      accessorKey: 'link',
      header: 'Ссылка',
      size: 420,
      cell: ({ row }) => (
        <Link className="text-blue-500" to={row.original.link} target="_blank">
          {row.original.link}
        </Link>
      ),
    },
  ];

  return (
    <main className="py-2">
      <h1 className="title mb-1 px-3">
        Книги ({categories?.length})
      </h1>

      {books ? (
        <DataTable
          data={books}
          columns={columns}
          sortingState={[{
            id: 'title',
            desc: false,
          }]}
          columnPinningState={{
            right: ['actions']
          }}
        />
      ) : (
        <Spinner className="w-8 h-8" />
      )}
    </main>
  );
}

export default TeacherBooks;
