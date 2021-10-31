import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Pagination, PaginationInterceptor } from '@package/pagination';
import { IPaginated, TPaginatedResult } from '@package/prisma';
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
  @UseInterceptors(PaginationInterceptor)
  public getUsers(
    @Pagination() options: IPaginated,
  ): Observable<TPaginatedResult<User>> {
    return this.client.send<TPaginatedResult<User>>('getUsers', options);
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
