import { useAppDispatch, useAppSelector } from '@/hooks';
import React, { useEffect, useState } from 'react';
import AppLayout from '@/components/layouts/app-layout';
import { ColumnDef } from '@tanstack/react-table';
import { RegisterLink, RegisterLinkId } from '@/types/auth';
import Button from '@/components/ui/button';
import DataTable from '@/components/ui/data-table/data-table';
import { getRegisterLinks } from '@/store/auth-slice/auth-selector';
import { fetchRegisterLinksAction } from '@/store/auth-slice/auth-api-actions';
import Spinner from '@/components/ui/spinner';
import { AppRoute } from '@/const/routes';
import HourCountdown from '@/components/ui/hour-countdown';
import dayjs from 'dayjs';
import classNames from 'classnames';
import GenerateButton from './generate-button';
import CopyButton from './copy-button';
import UpdateButton from './update-button';
import Modal from '@/components/ui/modal';
import RegisterLinkDeleteForm from '@/components/forms/auth/register-link-delete-form';

function RegisterLinksPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const links = useAppSelector(getRegisterLinks);
  const [deleteId, setDeleteId] = useState<RegisterLinkId | null>(null);

  useEffect(() => {
    if (!links.data && !links.isFetching) dispatch(fetchRegisterLinksAction());
  }, [dispatch, links.data, links.isFetching]);

  const columns: ColumnDef<RegisterLink>[] = [
    {
      id: 'token',
      accessorKey: 'token',
      header: 'Ссылка',
      size: 1334,
      cell: ({ row }) => (
        <a
          className="text-blue-600"
          href={`${AppRoute.Auth.Register}?token=${row.original.token}`}
          target="_blank"
        >
          {`${window.location.origin}${AppRoute.Auth.Register}?token=${row.original.token}`}
        </a>
      ),
    },
    {
      id: 'expiresAt',
      accessorKey: 'expiresAt',
      header: 'Срок действия',
      size: 320,
      cell: ({ row }) => {
        const secondsLeft = dayjs(row.original.expiresAt).diff(dayjs(), 'second');

        return (
          <div
            className={classNames(
              'text-lg font-medium',
              secondsLeft > 0 ? 'text-success' : 'text-danger'
            )}
          >
            <HourCountdown secondsLeft={secondsLeft} />
          </div>
        );
      },
    },
    {
      id: 'actions',
      accessorKey: 'actions',
      header: 'Действия',
      enableSorting: false,
      size: 200,
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <CopyButton link={`${window.location.origin}${AppRoute.Auth.Register}?token=${row.original.token}`} />
          <UpdateButton id={row.original.id} />
          <Button
            icon="delete"
            variant="danger"
            onClick={() => setDeleteId(row.original.id)}
          >
            <span className="sr-only">Удалить</span>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <AppLayout>
      <main className="pt-4 pb-10">
        <h1 className="title mb-1">
          Ссылки для регистрации ({links.data?.length})
        </h1>

        {links.data ? (
          <DataTable
            data={links.data}
            columns={columns}
            sortingState={[{
              id: 'expiresAt',
              desc: true,
            }]}
            columnPinningState={{
              right: ['actions']
            }}
            actions={<GenerateButton />}
          />
        ) : (
          <Spinner className="w-8 h-8" />
        )}
      </main>
      <Modal isOpen={deleteId ? true : false}>
        {deleteId && <RegisterLinkDeleteForm id={deleteId} setId={setDeleteId} />}
      </Modal>
    </AppLayout>
  );
}

export default RegisterLinksPage;
