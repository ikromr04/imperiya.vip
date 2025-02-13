import { UsersFilter } from '../types/users';

const SETTINGS_KEY_NAME = 'imperiya-vip-settings';

export const defaultUsersFilter: UsersFilter = {
  searchKeyword: '',
  name: {
    query: '',
    visibility: true,
  },
  login: {
    query: '',
    visibility: true,
  },
  roles: {
    query: [],
    visibility: true,
  },
  email: {
    query: '',
    visibility: true,
  },
  birthDate: {
    day: '',
    month: '',
    year: '',
    visibility: true,
  },
  address: {
    query: '',
    visibility: true,
  },
  sex: {
    query: '',
    visibility: true,
  },
  nationalities: {
    query: [],
    visibility: true,
  },
  socialLink: {
    query: '',
    visibility: true,
  },
  phoneNumber: {
    query: '',
    visibility: true,
  },
  grades: {
    query: [],
    visibility: true,
  },
};

export type AppSettings = {
  isNavigationCollapsed: boolean,
  usersFilter: UsersFilter,
}

export const initialSettings: AppSettings = {
  isNavigationCollapsed: true,
  usersFilter: defaultUsersFilter,
};

export const getAppSettings = (): AppSettings => {
  if (localStorage.getItem(SETTINGS_KEY_NAME)) {
    const settings: string | null = localStorage.getItem(SETTINGS_KEY_NAME);
    return JSON.parse(settings || '');
  }
  saveAppSettings(initialSettings);
  return initialSettings;
};

export const saveAppSettings = (settings: AppSettings): void =>
  localStorage.setItem(SETTINGS_KEY_NAME, JSON.stringify(settings));

export const dropAppSettings = (): void =>
  localStorage.setItem(SETTINGS_KEY_NAME, JSON.stringify(initialSettings));
