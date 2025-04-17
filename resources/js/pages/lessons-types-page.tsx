import React, { useEffect, useState } from 'react';
import AppLayout from '@/components/layouts/app-layout';
import { useAppDispatch, useAppSelector } from '@/hooks';
import DataTable from '@/components/ui/data-table/data-table';
import Spinner from '@/components/ui/spinner';
import { ColumnDef } from '@tanstack/react-table';
import Button from '@/components/ui/button';
import Modal from '@/components/ui/modal';
import { getLessonsTypes } from '@/store/lessons-slice/lessons-selector';
import { TypeStoreDTO, TypeUpdateDTO } from '@/dto/lessons';
import { Type, TypeId } from '@/types/lessons';
import { fetchLessonsTypesAction } from '@/store/lessons-slice/lessons-api-actions';
import TypesCreateForm from '@/components/forms/types/types-create-form';
import TypesEditForm from '@/components/forms/types/types-edit-form';
import TypesDeleteForm from '@/components/forms/types/types-delete-form';

function LessonsTypesPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const types = useAppSelector(getLessonsTypes);
  const [createDTO, setCreateDTO] = useState<TypeStoreDTO | null>(null);
  const [editDTO, setEditDTO] = useState<TypeUpdateDTO | null>(null);
  const [deleteDTO, setDeleteDTO] = useState<TypeId | null>(null);

  useEffect(() => {
    if (!types.data && !types.isFetching) dispatch(fetchLessonsTypesAction());
  }, [dispatch, types.data, types.isFetching]);

  const columns: ColumnDef<Type>[] = [
    {
      id: 'name',
      accessorKey: 'name',
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
              name: row.original.name,
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
    <AppLayout>
      <main className="py-2">
        <h1 className="title mb-1 px-3">
          Типы экзаменов ({types.data?.length})
        </h1>

        {types.data ? (
          <DataTable
            data={types.data}
            columns={columns}
            sortingState={[{
              id: 'name',
              desc: false,
            }]}
            columnPinningState={{
              right: ['actions']
            }}
            actions={(
              <Button
                icon="add"
                variant="success"
                onClick={() => setCreateDTO({ name: '' })}
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
          <TypesCreateForm dto={createDTO} setDTO={setCreateDTO} />
        )}
        {editDTO && (
          <TypesEditForm dto={editDTO} setDTO={setEditDTO} />
        )}
        {deleteDTO && (
          <TypesDeleteForm dto={deleteDTO} setDTO={setDeleteDTO} />
        )}
      </Modal>
    </AppLayout >
  );
}

export default LessonsTypesPage;
