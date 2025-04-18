import dayjs from 'dayjs';
import { UserId, Users, UsersFilter } from '../types/users';

export const filterUsers = (users: Users, filter: UsersFilter): Users => {
  users = users.filter((user) => (
    `${user.surname} ${user.name}`.toLowerCase().includes((filter.name || '').toLowerCase())
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
