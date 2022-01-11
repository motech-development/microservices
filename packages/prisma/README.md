[npm]: https://img.shields.io/npm/v/@motech-development/prisma
[npm-url]: https://www.npmjs.com/package/@motech-development/prisma
[size]: https://packagephobia.now.sh/badge?p=@motech-development/prisma
[size-url]: https://packagephobia.now.sh/result?p=@motech-development/prisma
[sonar]: https://sonarcloud.io/api/project_badges/measure?project=motech-development_microservices_5&metric=alert_status
[sonar-url]: https://sonarcloud.io/summary/new_code?id=motech-development_microservices_5

[![npm][npm]][npm-url]
[![size][size]][size-url]
[![sonar][sonar]][sonar-url]

# @motech-development/prisma

> NestJS module for Prisma

A NestJS module that allows you to interact with your database using Prisma.

# Installation

Add `@motech-development/prisma` as a dependency.

```bash
# Yarn
yarn add @motech-development/prisma

# NPM
npm i @motech-development/prisma
```

## Usage

Add the `PrismaModule` to your application.

```typescript
import { PrismaModule } from '@motech-development/prisma';

@Module({
  imports: [PrismaModule],
})
class AppModule {}
```

The module will then make the `PrismaService` available to use.

```typescript
import { PrismaService } from '@motech-development/prisma';

@Injectable()
class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  public deleteUser(id: string): Promise<void> {
    await this.prismaServiceuser.delete({
      where: {
        id,
      },
    });
  }
}
```
