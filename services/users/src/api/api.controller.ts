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
import { message } from '@motech-development/messages';
import {
  Pagination,
  PaginationInterceptor,
} from '@motech-development/pagination';
import { IPaginated, TPaginatedResult } from '@motech-development/prisma';
import { User } from '@prisma/client';
import { Observable } from 'rxjs';
import { CreateUser, UpdateUser } from '../shared/user';

@Controller()
class ApiController {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  @Post()
  public createUser(@Body() data: CreateUser): Observable<User> {
    const msg = message({
      data,
    });

    return this.client.send<User>('createUser', msg);
  }

  @Get(':id')
  public getUser(@Param('id') id: string): Observable<User | null> {
    const msg = message({
      id,
    });

    return this.client.send<User | null>('getUser', msg);
  }

  @Get()
  @UseInterceptors(PaginationInterceptor)
  public getUsers(
    @Pagination() data: IPaginated,
  ): Observable<TPaginatedResult<User>> {
    const msg = message({
      data,
    });

    return this.client.send<TPaginatedResult<User>>('getUsers', msg);
  }

  @Delete(':id')
  public removeUser(@Param('id') id: string): Observable<User> {
    const msg = message({
      id,
    });

    return this.client.send('removeUser', msg);
  }

  @Put(':id')
  public updateUser(
    @Body() data: UpdateUser,
    @Param('id') id: string,
  ): Observable<User> {
    const msg = message({
      data,
      id,
    });

    return this.client.send('updateUser', msg);
  }
}

export default ApiController;
