import dayjs from 'dayjs';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { UserId, Users, UsersFilter } from '../types/users';
import { Grades } from '@/types/grades';
import { VisibilityState } from '@tanstack/react-table';
import { Nationality } from '@/types/nationalities';
import { Profession } from '@/types/professions';
import { RoleName, SexName } from '@/const/users';

export const filterUsers = (users: Users, filter: UsersFilter): Users => {
  users = users.filter((user) => (
    `${user.surname} ${user.name} ${user.patronymic ?? ''}`.toLowerCase().includes((filter.name || '').toLowerCase())
    && (filter.sex ? (user.sex === filter.sex) : true)
    && (filter.grade ? (user.student?.gradeId?.toString() === filter.grade) : true)
    && (filter.role ? (user.role === filter.role) : true)
    && (filter.phone ? (user.phoneNumbers?.some((phone) => `+${phone.code} ${phone.numbers}`.includes(filter.phone || ''))) : true)
    && (filter.whatsapp ? (`+${user.whatsapp?.code} ${user.whatsapp?.numbers}`.includes(filter.whatsapp)) : true)
    && (filter.email ? (user.email?.includes(filter.email || '')) : true)
    && (filter.login ? (user.login?.includes(filter.login || '')) : true)
    && (filter.password ? (user.password?.includes(filter.password || '')) : true)
    && (filter.birthDate?.day ? (filter.birthDate.day === dayjs(user.birthDate).format('D').toString().padStart(2, '0')) : true)
    && (filter.birthDate?.month ? (filter.birthDate.month === dayjs(user.birthDate).format('M').toString().padStart(2, '0')) : true)
    && (filter.birthDate?.year ? (filter.birthDate.year.toString() === dayjs(user.birthDate).format('YYYY').toString()) : true)
    && (filter.address?.physicalAddress ? (`район ${user.address?.region}, ${user.address?.physicalAddress}`.toLowerCase()?.includes(filter.address.physicalAddress.toLowerCase() || '')) : true)
    && (filter.address?.region ? user.address?.region === filter.address.region : true)
    && (filter.nationality ? (user.nationalityId?.toString() === filter.nationality) : true)
    && (filter.professionId ? (user.parent?.professionId.toString() === filter.professionId) : true)
    && (filter.talents ? (user.student?.talents?.includes(filter.talents || '')) : true)
  ));

  return users;
};

export const getNextUserId = (users: Users, currentUserId: UserId): UserId => {
  const userIds = users.map(user => user.id);

  const currentIndex = userIds.indexOf(currentUserId);

  if (currentIndex === -1) {
    throw new Error('Current user ID not found in the list of users');
  }

  const nextIndex = (currentIndex + 1) % userIds.length;

  return userIds[nextIndex];
};

export const getPreviousUserId = (users: Users, currentUserId: UserId): UserId => {
  const userIds = users.map(user => user.id);
  const currentIndex = userIds.indexOf(currentUserId);

  if (currentIndex === -1) {
    throw new Error('Current user ID not found in the list of users');
  }

  const previousIndex = (currentIndex - 1 + userIds.length) % userIds.length;
  return userIds[previousIndex];
};

export const exportUsersToExcel = (
  users: Users,
  columnVisibility: VisibilityState,
  options: {
    grades?: Grades;
    nationalities?: Nationality[];
    professions?: Profession[];
  }
) => {
    const data = users.map((user) => {
      let filteredUser = {};
      if (columnVisibility.name !== false) {
        filteredUser = { ...filteredUser, 'ФИО': `${user.surname} ${user.name} ${user.patronymic ?? ''}` };
      }
      if (columnVisibility.sex !== false) {
        filteredUser = { ...filteredUser, 'Пол': SexName[user.sex] };
      }
      if (columnVisibility.grade !== false) {
        const grade = options.grades?.find(({ id }) => id === user.student?.gradeId);
        filteredUser = { ...filteredUser, 'Класс': grade ? `${grade?.level} ${grade?.group}` : '' };
      }
      if (columnVisibility.role !== false) {
        filteredUser = { ...filteredUser, 'Позиция': RoleName[user.role] };
      }
      if (columnVisibility.phoneNumbers !== false) {
        filteredUser = { ...filteredUser, 'Телефоны': user.phoneNumbers?.map((phone) => `+${phone.code} ${phone.numbers}`).join(', \n') };
      }
      if (columnVisibility.whatsapp !== false) {
        filteredUser = { ...filteredUser, 'WhatsApp': user.whatsapp ? `+${user.whatsapp.code} ${user.whatsapp.numbers}` : '' };
      }
      if (columnVisibility.email !== false) {
        filteredUser = { ...filteredUser, 'Электронная почта': user.email ?? '' };
      }
      if (columnVisibility.login !== false) {
        filteredUser = { ...filteredUser, 'Логин': user.login };
      }
      if (columnVisibility.password !== false) {
        filteredUser = { ...filteredUser, 'Пароль': user.password };
      }
      if (columnVisibility.birthDate !== false) {
        filteredUser = { ...filteredUser, 'Дата рождения': user.birthDate ? dayjs(user.birthDate).format('DD MMM YYYY') : '' };
      }
      if (columnVisibility.address !== false) {
        filteredUser = { ...filteredUser, 'Адрес': user.address ? `${(user.address.region !== 'За пределами города') && 'район '} ${user.address.region}, ${user.address.physicalAddress}` : '' };
      }
      if (columnVisibility.nationality !== false) {
        filteredUser = { ...filteredUser, 'Национальность': options.nationalities?.find((nationality) => nationality.id === user.nationalityId)?.name ?? '' };
      }
      if (columnVisibility.profession !== false) {
        filteredUser = { ...filteredUser, 'Сфера деятельности': options.professions?.find(({ id }) => id === user.parent?.professionId)?.name ?? '' };
      }

      return filteredUser;
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    const wbout = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, 'usersDataSheet.xlsx');
  };
