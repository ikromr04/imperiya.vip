import dayjs from 'dayjs';
import { UserId, Users, UsersFilter } from '../types/users';

export const filterUsers = (users: Users, filter: UsersFilter): Users => {
  users = users.filter((user) => (
    user.name.toLowerCase().includes(filter.searchKeyword)
    || user.login.toLowerCase().includes(filter.searchKeyword)
    || user.email?.toLowerCase().includes(filter.searchKeyword)
    || user.phones?.map((phone) => `+${phone.dialCode} ${phone.numbers}`).join(', ').includes(filter.searchKeyword)
  ));
  users = users.filter((user) => (
    user.name.toLowerCase().includes(filter.name.query?.toLowerCase() || '')
    && (filter.gender.query ? (user.gender?.id === filter.gender.query) : true)
    && (filter.roles.query.length ? filter.roles.query.includes(user.role.id) : true)
    && (filter.grades.query.length ? filter.grades.query.includes(user.grade?.id || 0) : true)
    && (filter.phone.query ? user.phones?.some((phone) => (`+${phone.dialCode} ${phone.numbers}`).includes(filter.phone.query)) : true)
    && (filter.email.query ? user.email?.includes(filter.email.query) : true)
    && (filter.login ? user.login?.includes(filter.login.query) : true)
    && (filter.address.query ? user.address?.toLowerCase().includes(filter.address.query.toLowerCase()) : true)
    && (filter.nationalities.query.length ? filter.nationalities.query.includes(user.nationality?.id || 0) : true)
    && (filter.birthDate.day ? (filter.birthDate.day.toString() === dayjs(user.birthDate).format('D').toString().padStart(2, '0')) : true)
    && (filter.birthDate.month ? (filter.birthDate.month.toString() === dayjs(user.birthDate).format('M').toString().padStart(2, '0')) : true)
    && (filter.birthDate.year ? (filter.birthDate.year.toString() === dayjs(user.birthDate).format('YYYY').toString()) : true)
    && (filter.socials.query.length ? (
      (filter.socials.query.includes('facebook') ? user.facebook : true)
      && (filter.socials.query.includes('instagram') ? user.instagram : true)
      && (filter.socials.query.includes('telegram') ? user.telegram : true)
      && (filter.socials.query.includes('odnoklassniki') ? user.odnoklassniki : true)
    ) : true)
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
