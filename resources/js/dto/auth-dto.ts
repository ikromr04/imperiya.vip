export type LoginCredentials = {
  login: string;
  password: string;
};

export type ResetPasswordDTO = {
  token: string;
  password: string;
  password_confirmation: string;
  mail: boolean;
};
