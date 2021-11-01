import { IsEmail } from 'class-validator';

/** Create user DTO */
export class CreateUser {
  /** Email address. Required. */
  @IsEmail()
  public email!: string;
}

/** Update user DTO */
export class UpdateUser {
  /** Email address. Required. */
  @IsEmail()
  public email!: string;
}
