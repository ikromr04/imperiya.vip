import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import DataTable from '@/components/ui/data-table/data-table';
import Spinner from '@/components/ui/spinner';
import { ColumnDef } from '@tanstack/react-table';
import Button from '@/components/ui/button';
import Modal from '@/components/ui/modal';
import { AsyncStatus } from '@/const/store';
import { getBookCategories, getBookCategoriesStatus, getBooks, getBooksStatus } from '@/store/books-slice/books-selector';
import { BookStoreDTO, BookUpdateDTO } from '@/dto/books';
import { Book, BookId } from '@/types/books';
import { fetchBookCategoriesAction, fetchBooksAction } from '@/store/books-slice/books-api-actions';
import BooksCreateForm from '@/components/forms/books/books-create-form';
import BooksEditForm from '@/components/forms/books/books-edit-form';
import BooksDeleteForm from '@/components/forms/books/books-delete-form';
import { AccessText } from '@/const/books';
import { Link } from 'react-router-dom';

function SuperadminBooks(): JSX.Element {
  const dispatch = useAppDispatch();

  const booksStatus = useAppSelector(getBooksStatus);
  const categoriesStatus = useAppSelector(getBookCategoriesStatus);

  const books = useAppSelector(getBooks);
  const categories = useAppSelector(getBookCategories);

  const [createDTO, setCreateDTO] = useState<BookStoreDTO | null>(null);
  const [editDTO, setEditDTO] = useState<BookUpdateDTO | null>(null);
  const [deleteDTO, setDeleteDTO] = useState<BookId | null>(null);

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
    {
      id: 'actions',
      accessorKey: 'actions',
      header: 'Действия',
      enableSorting: false,
      size: 120,
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Button
            icon="edit"
            variant="warning"
            onClick={() => setEditDTO({
              id: row.original.id,
              category_id: +row.original.categoryId,
              title: row.original.title,
              access: row.original.access,
              lang: row.original.lang,
              link: row.original.link,
              description: row.original.description,
            })}
          >
            <span className="sr-only">Редактировать</span>
          </Button>
          <Button
            icon="delete"
            variant="danger"
            onClick={() => setDeleteDTO(row.original.id)}
          >
            <span className="sr-only">Удалить</span>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <main className="py-2">
        <h1 className="title mb-1 px-3">
          Книги ({books?.length})
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
            actions={(
              <Button
                icon="add"
                variant="success"
                onClick={() => setCreateDTO({
                  category_id: 0,
                  title: '',
                  access: 'all',
                  lang: '',
                })}
              >
                <span className="sr-only md:not-sr-only">Добавить</span>
              </Button>
            )}
          />
        ) : (
          <Spinner className="w-8 h-8" />
        )}
      </main>

      <Modal isOpen={(createDTO || editDTO || deleteDTO) ? true : false}>
        {createDTO && (
          <BooksCreateForm dto={createDTO} setDTO={setCreateDTO} />
        )}
        {editDTO && (
          <BooksEditForm dto={editDTO} setDTO={setEditDTO} />
        )}
        {deleteDTO && (
          <BooksDeleteForm dto={deleteDTO} setDTO={setDeleteDTO} />
        )}
      </Modal>
    </ >
  );
}

export default SuperadminBooks;
