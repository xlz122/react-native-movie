export type ResponseType<T = any> = {
  code?: number;
  data?: T;
  message?: string;
};
