import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import DataTable from '@/components/ui/data-table/data-table';
import Spinner from '@/components/ui/spinner';
import { ColumnDef } from '@tanstack/react-table';
import Button from '@/components/ui/button';
import Modal from '@/components/ui/modal';
import { TypeStoreDTO, TypeUpdateDTO } from '@/dto/lessons';
import TypesCreateForm from '@/components/forms/types/types-create-form';
import TypesEditForm from '@/components/forms/types/types-edit-form';
import TypesDeleteForm from '@/components/forms/types/types-delete-form';
import { getLessonTypes, getLessonTypesStatus } from '@/store/lessons-slice/lessons-selector';
import { AsyncStatus } from '@/const/store';
import { fetchLessonTypesAction } from '@/store/lessons-slice/lessons-api-actions';
import { LessonType, LessonTypeId } from '@/types/lessons';

function LessonsTypesPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const typesStatus = useAppSelector(getLessonTypesStatus);
  const types = useAppSelector(getLessonTypes);
  const [createDTO, setCreateDTO] = useState<TypeStoreDTO | null>(null);
  const [editDTO, setEditDTO] = useState<TypeUpdateDTO | null>(null);
  const [deleteDTO, setDeleteDTO] = useState<LessonTypeId | null>(null);

  useEffect(() => {
    if (typesStatus === AsyncStatus.Idle) dispatch(fetchLessonTypesAction());
  }, [dispatch, typesStatus]);

  const columns: ColumnDef<LessonType>[] = [
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
          Типы экзаменов ({types?.length})
        </h1>

        {types ? (
          <DataTable
            data={types}
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
    </ >
  );
}

export default LessonsTypesPage;
