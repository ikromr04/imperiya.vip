import dayjs from 'dayjs';

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

export const getCurrentWeekDates = (currentWeek = 0) => {
  const startOfWeek = dayjs().startOf('week');
  return Array.from({ length: 6 }, (_, i) => startOfWeek.add(i + (currentWeek * 7), 'day'));
};

export const capitalizeString = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);
