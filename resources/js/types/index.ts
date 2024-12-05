export type ID = number;

export type ResponseMessage = {
  message: string;
}

export type PropsWithClassname<T = unknown> = T & { className?: string };
