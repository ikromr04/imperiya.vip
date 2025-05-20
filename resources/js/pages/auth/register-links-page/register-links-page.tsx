import { useAppDispatch, useAppSelector } from '@/hooks';
import React, { useEffect, useState } from 'react';
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
import Modal from '@/components/ui/modal';
import RegisterLinkDeleteForm from '@/components/forms/auth/register-link-delete-form';
import CopyButton from './copy-button';
import UpdateButton from './update-button';
import GenerateButton from './generate-button';

function RegisterLinksPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const links = useAppSelector(getRegisterLinks);
  const [deleteId, setDeleteId] = useState<RegisterLinkId | null>(null);

  useEffect(() => {
    if (!links.data && !links.isFetching) dispatch(fetchRegisterLinksAction());
  }, [dispatch, links.data, links.isFetching]);

  const columns: ColumnDef<RegisterLink>[] = [
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
      meta:{
        columnClass: '!min-w-[160px] !w-[160px] !max-w-[160px]',
      }
    },
    {
      id: 'token',
      accessorKey: 'token',
      header: 'Ссылка',
      cell: ({ row }) => (
        <a
          className="text-blue-600"
          href={`${AppRoute.Auth.Register}?token=${row.original.token}`}
          target="_blank"
        >
          {`${window.location.origin}${AppRoute.Auth.Register}?token=${row.original.token}`}
        </a>
      ),
      meta:{
        columnClass: '!min-w-[320px] !w-[320px] !max-w-[320px] sm:!min-w-[640px] sm:!w-[640px] sm:!max-w-[640px] lg:!min-w-[1524px] sm:!w-[1524px] sm:!max-w-[1524px]',
      }
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
      meta:{
        columnClass: '!min-w-[170px] !w-[170px] !max-w-[170px]',
      }
    },
  ];

  return (
    <>
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
              desc: false,
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
    </>
  );
}

export default RegisterLinksPage;
