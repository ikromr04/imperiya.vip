import { Users, UsersFilter } from './types/users';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const debounce = <F extends (...args: any) => any>(
  func: F,
  delay = 500,
) => {
  let timeout: ReturnType<typeof setTimeout> | number = 0;

  const debounced = (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };

  return debounced as (...args: Parameters<F>) => ReturnType<F>;
};

export const generateRandomPassword = (length: number = 8): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  let password = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  return password;
};

export const filterUsers = (users: Users, searchKeyword: string, filter: UsersFilter): Users => {
  users = users.filter((user) => (
    user.name.toLowerCase().includes(searchKeyword)
    || user.login.toLowerCase().includes(searchKeyword)
    || user.email?.toLowerCase().includes(searchKeyword)
    || user.phones?.map((phone) => `+${phone.dialCode} ${phone.numbers}`).join(', ').includes(searchKeyword)
  ));

  users = users.filter((user) => (
    user.name.toLowerCase().includes(filter.name.query?.toLowerCase() || '')
    && (filter.gender.query ? (user.gender?.id === filter.gender.query) : true)
    && (filter.roles.query.length ? filter.roles.query.includes(user.role.id) : true)
    && (filter.grades.query.length ? filter.grades.query.includes(user.grade?.id || 0) : true)
  ));

  return users;
};
