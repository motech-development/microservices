import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { TOrder } from '@package/prisma';
import { User } from '@prisma/client';
import { Observable } from 'rxjs';
import { ICreateUser, IUpdateUser } from '../shared/user';

@Controller()
class ApiController {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  @Post()
  public createUser(@Body() data: ICreateUser): Observable<User> {
    return this.client.send<User>('createUser', data);
  }

  @Get(':id')
  public getUser(@Param('id') id: string): Observable<User | null> {
    return this.client.send<User | null>('getUser', id);
  }

  @Get()
  public getUsers(
    @Query('orderBy') orderBy?: TOrder,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ): Observable<User[]> {
    return this.client.send<User[]>('getUsers', {
      orderBy,
      skip,
      take,
    });
  }

  @Delete(':id')
  public removeUser(@Param('id') id: string): Observable<User> {
    return this.client.send('removeUser', id);
  }

  @Put(':id')
  public updateUser(
    @Body() data: IUpdateUser,
    @Param('id') id: string,
  ): Observable<User> {
    return this.client.send('updateUser', {
      data,
      id,
    });
  }
}

export default ApiController;
