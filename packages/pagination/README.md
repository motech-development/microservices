[npm]: https://img.shields.io/npm/v/@motech-development/pagination
[npm-url]: https://www.npmjs.com/package/@motech-development/pagination
[size]: https://packagephobia.now.sh/badge?p=@motech-development/pagination
[size-url]: https://packagephobia.now.sh/result?p=@motech-development/pagination
[sonar]: https://sonarcloud.io/api/project_badges/measure?project=motech-development_microservices_4&metric=alert_status
[sonar-url]: https://sonarcloud.io/summary/new_code?id=motech-development_microservices_4

[![npm][npm]][npm-url]
[![size][size]][size-url]
[![sonar][sonar]][sonar-url]

# @motech-development/pagination

> NestJS pagination utility

This utility provides an interceptor and decorator that, in conjunction, allow you to quickly convert query string parameters into paginated inputs for querying data.

## Installation

Add `@motech-development/pagination` as a dependency.

```bash
# Yarn
yarn add @motech-development/pagination

# NPM
npm i @motech-development/pagination
```

## Usage

Add the `PaginationModule` to your application.

```typescript
import { PaginationModule } from '@motech-development/pagination';

@Module({
  imports: [PaginationModule],
})
class AppModule {}
```

This module will then make the `PaginationInterceptor` and `Pagination` decorator available to use in your controllers.

```typescript
import {
  IPaginated,
  Pagination,
  PaginationInterceptor,
} from '@motech-development/pagination';

@Controller()
class AppController {
  @Get()
  @UseInterceptors(PaginationInterceptor)
  public get(@Pagination() data: IPaginated): IPaginated {
    return data;
  }
}
```

The pagination decorator accepts the following query string parameters; `dir`, `limit`, `page`, `sortBy`. If not set `dir` defaults to `descending`, `limit` to `10` and `page` to `1`.

The output will be the following object.

```typescript
interface IOutput {
  orderBy: {
    [name: string]: 'asc' | 'desc';
  };
  skip: number;
  take: number;
}
```
