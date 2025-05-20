import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import DataTable from '@/components/ui/data-table/data-table';
import Spinner from '@/components/ui/spinner';
import { ColumnDef } from '@tanstack/react-table';
import Button from '@/components/ui/button';
import Modal from '@/components/ui/modal';
import { getNationalities, getNationalitiesStatus } from '@/store/nationalities-slice/nationalities-selector';
import { NationalityStoreDTO, NationalityUpdateDTO } from '@/dto/nationalities';
import { Nationality, NationalityId } from '@/types/nationalities';
import { fetchNationalitiesAction } from '@/store/nationalities-slice/nationalities-api-actions';
import NationalitiesCreateForm from '@/components/forms/nationalities/nationalities-create-form';
import NationalitiesEditForm from '@/components/forms/nationalities/nationalities-edit-form';
import NationalitiesDeleteForm from '@/components/forms/nationalities/nationalities-delete-form';
import { AsyncStatus } from '@/const/store';

function NationalitiesPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const nationalitiesStatus = useAppSelector(getNationalitiesStatus);
  const nationalities = useAppSelector(getNationalities);
  const [createDTO, setCreateDTO] = useState<NationalityStoreDTO | null>(null);
  const [editDTO, setEditDTO] = useState<NationalityUpdateDTO | null>(null);
  const [deleteDTO, setDeleteDTO] = useState<NationalityId | null>(null);

  useEffect(() => {
    if (nationalitiesStatus === AsyncStatus.Idle) dispatch(fetchNationalitiesAction());
  }, [dispatch, nationalitiesStatus]);

  const columns: ColumnDef<Nationality>[] = [
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
    <>
      <main className="py-2">
        <h1 className="title mb-1 px-3">
          Национальности ({nationalities?.length})
        </h1>

        {nationalities ? (
          <DataTable
            data={nationalities}
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
          <NationalitiesCreateForm dto={createDTO} setDTO={setCreateDTO} />
        )}
        {editDTO && (
          <NationalitiesEditForm dto={editDTO} setDTO={setEditDTO} />
        )}
        {deleteDTO && (
          <NationalitiesDeleteForm dto={deleteDTO} setDTO={setDeleteDTO} />
        )}
      </Modal>
    </ >
  );
}

export default NationalitiesPage;
