export type RequestLoginDTO = {
  email: string;
  password: string;
};
export type LoginDTO = {
  email: string;
  code: string;
  isPersistence: boolean;
};
