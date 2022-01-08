import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IMessageOutput } from '@motech-development/messages';
import { IPaginated, TPaginatedResult } from '@motech-development/prisma';
import { User } from '@prisma/client';
import { CreateUser, UpdateUser, UserService } from '../shared/user';

@Controller()
class ServiceController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('createUser')
  public async createUser(@Payload() user: CreateUser): Promise<User> {
    return this.userService.createUser(user);
  }

  @MessagePattern('getUser')
  public async getUser(@Payload() id: string): Promise<User | null> {
    return this.userService.getUser(id);
  }

  @MessagePattern('getUsers')
  public async getUsers(
    @Payload() options: IPaginated,
  ): Promise<TPaginatedResult<User>> {
    return this.userService.getUsers(options);
  }

  @MessagePattern('removeUser')
  public async removeUser(@Payload() id: string): Promise<User | null> {
    return this.userService.removeUser(id);
  }

  @MessagePattern('updateUser')
  public async updateUser(
    @Payload() { data, id }: IMessageOutput<UpdateUser>,
  ): Promise<User> {
    return this.userService.updateUser(id, data);
  }
}

export default ServiceController;
