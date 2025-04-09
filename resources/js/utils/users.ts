import dayjs from 'dayjs';
import { User, UserId, Users, UsersFilter } from '../types/users';

export const filterUsers = (users: Users, filter: UsersFilter): Users => {
  users = users.filter((user) => (
     `${user.name} ${user.surname}`.toLowerCase().includes((filter.name || '').toLowerCase())
    && (filter.sex ? (user.sex === filter.sex) : true)
    && (filter.grade ? (user.student?.gradeId?.toString() === filter.grade) : true)
    && (filter.role ? (user.role === filter.role) : true)
    && (filter.phone ? (user.phoneNumbers?.some((phone) => `+${phone.code} ${phone.numbers}`.includes(filter.phone || ''))) : true)
    && (filter.whatsapp ? (`+${user.whatsapp?.code} ${user.whatsapp?.numbers}`.includes(filter.whatsapp)) : true)
    && (filter.email ? (user.email?.includes(filter.email || '')) : true)
    && (filter.login ? (user.login?.includes(filter.login || '')) : true)
    && (filter.birthDate?.day ? (filter.birthDate.day === dayjs(user.birthDate).format('D').toString().padStart(2, '0')) : true)
    && (filter.birthDate?.month ? (filter.birthDate.month === dayjs(user.birthDate).format('M').toString().padStart(2, '0')) : true)
    && (filter.birthDate?.year ? (filter.birthDate.year.toString() === dayjs(user.birthDate).format('YYYY').toString()) : true)
    // && (filter.address ? (user.address?.toLowerCase()?.includes(filter.address.toLowerCase() || '')) : true)
    // && (filter.nationality ? (user.nationality === filter.nationality) : true)
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

export const getCreatedAtText = (user: User): string => {
  switch (user.role) {
    case 'student':
      return 'Дата поступления';

    case 'parent':
      return 'Дата добавления';

    default:
      return 'Дата найма';
  }
};
