export type ValidationError = {
  message: string;
  errors?: {
    [fieldName:string]: string[];
  };
}
