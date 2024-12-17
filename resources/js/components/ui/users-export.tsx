import React from 'react';
import Button from './button';
import * as XLSX from 'xlsx';
import { useAppSelector } from '../../hooks';
import { getUsers } from '../../store/users-slice/users-selector';
import { getUsersFilter } from '../../store/app-slice/app-selector';
import { filterUsers } from '../../utils';

export default function UsersExport(): JSX.Element {
  const users = useAppSelector(getUsers);
  const filter = useAppSelector(getUsersFilter);
  const sheetData = filterUsers(users || [], filter);

  const handleExport = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(filterUsers());

    XLSX.utils.book_append_sheet(wb, ws, 'users');
    XLSX.writeFile(wb, 'imperiya.vip_users_sheet.xlsx');
  };

  return (
    <Button
      type="button"
      icon="fileExport"
      variant="light"
      onClick={handleButtonClick}
    >
      <span className="sr-only md:not-sr-only">Экспорт</span>
    </Button>
  );
}
