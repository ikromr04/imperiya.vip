import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getSubjects, getSubjectsStatus } from '@/store/subjects-slice/subjects-selector';
import { fetchSubjectsAction } from '@/store/subjects-slice/subjects-api-actions';
import DataTable from '@/components/ui/data-table/data-table';
import Spinner from '@/components/ui/spinner';
import { ColumnDef } from '@tanstack/react-table';
import { Subject, SubjectId } from '@/types/subjects';
import Button from '@/components/ui/button';
import { SubjectStoreDTO, SubjectUpdateDTO } from '@/dto/subjects';
import Modal from '@/components/ui/modal';
import SubjectsCreateForm from '@/components/forms/subjects/subjects-create-form';
import SubjectsEditForm from '@/components/forms/subjects/subjects-edit-form';
import SubjectsDeleteForm from '@/components/forms/subjects/subjects-delete-form';
import { AsyncStatus } from '@/const/store';
import { getAuthUser } from '@/store/auth-slice/auth-selector';

function SubjectsPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const subjectsStatus = useAppSelector(getSubjectsStatus);
  const authUser = useAppSelector(getAuthUser);
  const subjects = useAppSelector(getSubjects);
  const [createDTO, setCreateDTO] = useState<SubjectStoreDTO | null>(null);
  const [editDTO, setEditDTO] = useState<SubjectUpdateDTO | null>(null);
  const [deleteDTO, setDeleteDTO] = useState<SubjectId | null>(null);

  useEffect(() => {
    if (subjectsStatus == AsyncStatus.Idle) dispatch(fetchSubjectsAction());
  }, [dispatch, subjectsStatus]);

  let columns: ColumnDef<Subject>[] = [
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
          Предметы ({subjects?.length})
        </h1>

        {subjects ? (
          <DataTable
            data={subjects}
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
          <SubjectsCreateForm dto={createDTO} setDTO={setCreateDTO} />
        )}
        {editDTO && (
          <SubjectsEditForm dto={editDTO} setDTO={setEditDTO} />
        )}
        {deleteDTO && (
          <SubjectsDeleteForm dto={deleteDTO} setDTO={setDeleteDTO} />
        )}
      </Modal>
    </ >
  );
}

export default SubjectsPage;
