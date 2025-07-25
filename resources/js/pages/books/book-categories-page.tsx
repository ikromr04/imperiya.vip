import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import DataTable from '@/components/ui/data-table/data-table';
import Spinner from '@/components/ui/spinner';
import { ColumnDef } from '@tanstack/react-table';
import Button from '@/components/ui/button';
import Modal from '@/components/ui/modal';
import { AsyncStatus } from '@/const/store';
import { getBookCategories, getBookCategoriesStatus } from '@/store/books-slice/books-selector';
import { BookCategoryStoreDTO, BookCategoryUpdateDTO } from '@/dto/books';
import { BookCategory, BookCategoryId } from '@/types/books';
import { fetchBookCategoriesAction } from '@/store/books-slice/books-api-actions';
import BookCategoriesCreateForm from '@/components/forms/books/book-categories-create-form';
import BookCategoriesEditForm from '@/components/forms/books/book-categories-edit-form';
import BookCategoriesDeleteForm from '@/components/forms/books/book-categories-delete-form';

function BookCategoriesPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const categoriesStatus = useAppSelector(getBookCategoriesStatus);
  const categories = useAppSelector(getBookCategories);
  const [createDTO, setCreateDTO] = useState<BookCategoryStoreDTO | null>(null);
  const [editDTO, setEditDTO] = useState<BookCategoryUpdateDTO | null>(null);
  const [deleteDTO, setDeleteDTO] = useState<BookCategoryId | null>(null);

  useEffect(() => {
    if (categoriesStatus === AsyncStatus.Idle) dispatch(fetchBookCategoriesAction());
  }, [categoriesStatus, dispatch]);

  const columns: ColumnDef<BookCategory>[] = [
    {
      id: 'title',
      accessorKey: 'title',
      header: 'Название',
      size: 1686,
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
              title: row.original.title,
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
          Причины ({categories?.length})
        </h1>

        {categories ? (
          <DataTable
            data={categories}
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
                onClick={() => setCreateDTO({ title: '' })}
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
          <BookCategoriesCreateForm dto={createDTO} setDTO={setCreateDTO} />
        )}
        {editDTO && (
          <BookCategoriesEditForm dto={editDTO} setDTO={setEditDTO} />
        )}
        {deleteDTO && (
          <BookCategoriesDeleteForm dto={deleteDTO} setDTO={setDeleteDTO} />
        )}
      </Modal>
    </ >
  );
}

export default BookCategoriesPage;
