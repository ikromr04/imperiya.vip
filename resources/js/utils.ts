import { Users } from './types/users';

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

export const filterUsers = (users: Users, searchKeyword: string): Users => {
  return users.filter((user) => (
    user.name.toLowerCase().includes(searchKeyword)
    || user.login.toLowerCase().includes(searchKeyword)
    || user.email?.toLowerCase().includes(searchKeyword)
    || user.phones?.map((phone) => `+${phone.dialCode} ${phone.numbers}`).join(', ').includes(searchKeyword)
  ));
};
