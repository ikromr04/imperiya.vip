import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import DataTable from '@/components/ui/data-table/data-table';
import Spinner from '@/components/ui/spinner';
import { ColumnDef } from '@tanstack/react-table';
import Button from '@/components/ui/button';
import Modal from '@/components/ui/modal';
import { getProfessions, getProfessionsStatus } from '@/store/professions-slice/professions-selector';
import { ProfessionStoreDTO, ProfessionUpdateDTO } from '@/dto/professions';
import { Profession, ProfessionId } from '@/types/professions';
import { fetchProfessionsAction } from '@/store/professions-slice/professions-api-actions';
import ProfessionsCreateForm from '@/components/forms/professions/professions-create-form';
import ProfessionsEditForm from '@/components/forms/professions/professions-edit-form';
import ProfessionsDeleteForm from '@/components/forms/professions/profession-delete-form';
import { AsyncStatus } from '@/const/store';
import { getAuthUser } from '@/store/auth-slice/auth-selector';

function ProfessionsPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const professionsStatus = useAppSelector(getProfessionsStatus);
  const professions = useAppSelector(getProfessions);
  const authUser = useAppSelector(getAuthUser);
  const [createDTO, setCreateDTO] = useState<ProfessionStoreDTO | null>(null);
  const [editDTO, setEditDTO] = useState<ProfessionUpdateDTO | null>(null);
  const [deleteDTO, setDeleteDTO] = useState<ProfessionId | null>(null);

  useEffect(() => {
    if (professionsStatus === AsyncStatus.Idle) dispatch(fetchProfessionsAction());
  }, [dispatch, professionsStatus]);

  let columns: ColumnDef<Profession>[] = [
    {
      id: 'name',
      accessorKey: 'name',
      header: 'Название',
      size: 1686,
    },
  ];

  if (authUser?.role === 'superadmin') {
    columns = [
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
  }

  return (
    <>
      <main className="py-2">
        <h1 className="title mb-1 px-3">
          Сфера деятельности ({professions?.length})
        </h1>

        {professions ? (
          <DataTable
            data={professions}
            columns={columns}
            sortingState={[{
              id: 'name',
              desc: false,
            }]}
            columnPinningState={{
              right: ['actions']
            }}
            actions={authUser?.role === 'superadmin' && (
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
          <ProfessionsCreateForm dto={createDTO} setDTO={setCreateDTO} />
        )}
        {editDTO && (
          <ProfessionsEditForm dto={editDTO} setDTO={setEditDTO} />
        )}
        {deleteDTO && (
          <ProfessionsDeleteForm dto={deleteDTO} setDTO={setDeleteDTO} />
        )}
      </Modal>
    </ >
  );
}

export default ProfessionsPage;
