import React, { useEffect, useState } from 'react';
import AppLayout from '@/components/layouts/app-layout';
import { useAppDispatch, useAppSelector } from '@/hooks';
import DataTable from '@/components/ui/data-table/data-table';
import Spinner from '@/components/ui/spinner';
import { ColumnDef } from '@tanstack/react-table';
import Button from '@/components/ui/button';
import Modal from '@/components/ui/modal';
import { getProfessions } from '@/store/professions-slice/professions-selector';
import { ProfessionStoreDTO, ProfessionUpdateDTO } from '@/dto/professions';
import { Profession, ProfessionId } from '@/types/professions';
import { fetchProfessionsAction } from '@/store/professions-slice/professions-api-actions';
import ProfessionsCreateForm from '@/components/forms/professions/professions-create-form';
import ProfessionsEditForm from '@/components/forms/professions/professions-edit-form';
import ProfessionsDeleteForm from '@/components/forms/professions/profession-delete-form';

function ProfesionsPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const professions = useAppSelector(getProfessions);
  const [createDTO, setCreateDTO] = useState<ProfessionStoreDTO | null>(null);
  const [editDTO, setEditDTO] = useState<ProfessionUpdateDTO | null>(null);
  const [deleteDTO, setDeleteDTO] = useState<ProfessionId | null>(null);

  useEffect(() => {
    if (!professions.data && !professions.isFetching) dispatch(fetchProfessionsAction());
  }, [dispatch, professions.data, professions.isFetching]);

  const columns: ColumnDef<Profession>[] = [
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
          Сфера деятельности ({professions.data?.length})
        </h1>

        {professions.data ? (
          <DataTable
            data={professions.data}
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
          <ProfessionsCreateForm dto={createDTO} setDTO={setCreateDTO} />
        )}
        {editDTO && (
          <ProfessionsEditForm dto={editDTO} setDTO={setEditDTO} />
        )}
        {deleteDTO && (
          <ProfessionsDeleteForm dto={deleteDTO} setDTO={setDeleteDTO} />
        )}
      </Modal>
    </AppLayout >
  );
}

export default ProfesionsPage;
