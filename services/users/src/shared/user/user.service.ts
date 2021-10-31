import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { IPaginated, PrismaService, TPaginatedResult } from '@package/prisma';
import { ICreateUser, IUpdateUser } from './user.interface';

@Injectable()
class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  public async createUser(data: ICreateUser): Promise<User> {
    return this.prismaService.user.create({
      data,
    });
  }

  public async getUser(id: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  public async getUsers(options: IPaginated): Promise<TPaginatedResult<User>> {
    const { orderBy, skip, take } = options;

    return this.prismaService.$transaction([
      this.prismaService.user.count(),
      this.prismaService.user.findMany({
        orderBy,
        skip,
        take,
      }),
    ]);
  }

  public async removeUser(id: string): Promise<User> {
    return this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }

  public async updateUser(id: string, data: IUpdateUser): Promise<User> {
    return this.prismaService.user.update({
      data,
      where: {
        id,
      },
    });
  }
}

export default UserService;
