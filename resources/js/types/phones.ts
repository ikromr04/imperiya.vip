export type PhoneId = number;

export type Phone = {
  id: PhoneId;
  numbers: number;
  dialCode: number;
};

export type Phones = Phone[];
