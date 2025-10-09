import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import DataTable from '@/components/ui/data-table/data-table';
import Spinner from '@/components/ui/spinner';
import { ColumnDef } from '@tanstack/react-table';
import Button from '@/components/ui/button';
import Modal from '@/components/ui/modal';
import { AsyncStatus } from '@/const/store';
import { getReasons, getReasonsStatus } from '@/store/reasons-slice/reasons-selector';
import { ReasonStoreDTO, ReasonUpdateDTO } from '@/dto/reasons';
import { Reason, ReasonId } from '@/types/reasons';
import { fetchReasonsAction } from '@/store/reasons-slice/reasons-api-actions';
import ReasonsCreateForm from '@/components/forms/reasons/reasons-create-form';
import ReasonsEditForm from '@/components/forms/reasons/reasons-edit-form';
import ReasonsDeleteForm from '@/components/forms/reasons/reasons-delete-form';
import { getAuthUser } from '@/store/auth-slice/auth-selector';

function ReasonsPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const reasonsStatus = useAppSelector(getReasonsStatus);
  const reasons = useAppSelector(getReasons);
  const authUser = useAppSelector(getAuthUser);
  const [createDTO, setCreateDTO] = useState<ReasonStoreDTO | null>(null);
  const [editDTO, setEditDTO] = useState<ReasonUpdateDTO | null>(null);
  const [deleteDTO, setDeleteDTO] = useState<ReasonId | null>(null);

  useEffect(() => {
    if (reasonsStatus === AsyncStatus.Idle) dispatch(fetchReasonsAction());
  }, [dispatch, reasonsStatus]);

  let columns: ColumnDef<Reason>[] = [
    {
      id: 'description',
      accessorKey: 'description',
      header: 'Описание',
      size: 1686,
    },
  ];

  if (authUser?.role === 'superadmin') {
    columns = [
      {
        id: 'description',
        accessorKey: 'description',
        header: 'Описание',
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
  }

  return (
    <>
      <main className="py-2">
        <h1 className="title mb-1 px-3">
          Причины ({reasons?.length})
        </h1>

        {reasons ? (
          <DataTable
            data={reasons}
            columns={columns}
            sortingState={[{
              id: 'description',
              desc: false,
            }]}
            columnPinningState={{
              right: ['actions']
            }}
            actions={authUser?.role === 'superadmin' && (
              <Button
                icon="add"
                variant="success"
                onClick={() => setCreateDTO({ description: '' })}
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
          <ReasonsCreateForm dto={createDTO} setDTO={setCreateDTO} />
        )}
        {editDTO && (
          <ReasonsEditForm dto={editDTO} setDTO={setEditDTO} />
        )}
        {deleteDTO && (
          <ReasonsDeleteForm dto={deleteDTO} setDTO={setDeleteDTO} />
        )}
      </Modal>
    </ >
  );
}

export default ReasonsPage;
