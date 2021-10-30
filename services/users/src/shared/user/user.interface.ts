export interface ICreateUser {
  email: string;
}

export interface IUpdateUser {
  email: string;
}

export interface IUpdateUserMessage {
  id: string;
  data: IUpdateUser;
}
