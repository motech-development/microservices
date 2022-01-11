[npm]: https://img.shields.io/npm/v/@motech-development/logger
[npm-url]: https://www.npmjs.com/package/@motech-development/logger
[size]: https://packagephobia.now.sh/badge?p=@motech-development/logger
[size-url]: https://packagephobia.now.sh/result?p=@motech-development/logger
[sonar]: https://sonarcloud.io/api/project_badges/measure?project=motech-development_microservices_2&metric=alert_status
[sonar-url]: https://sonarcloud.io/summary/new_code?id=motech-development_microservices_2

[![npm][npm]][npm-url]
[![size][size]][size-url]
[![sonar][sonar]][sonar-url]

# @motech-development/logger

> NestJS application logger

A Morgan logger for NestJS.

## Installation

Add `@motech-development/logger` as a dependency.

```bash
# Yarn
yarn add @motech-development/logger

# NPM
npm i @motech-development/logger
```

## Usage

Add the `LoggerModule` to your application.

```typescript
import { LoggerModule } from '@motech-development/logger';

@Module({
  imports: [LoggerModule],
})
class AppModule {}
```

This will automatically begin to log all network requests in your application and provide the logger to use in your application.

```typescript
import { Logger } from '@motech-development/logger';

@Injectable()
class MyService {
  private readonly logger = new Logger();

  public myMethod(): void {
    this.logger.log('Testing, 123');
  }
}

// Or...

@Injectable()
class AnotherService {
  constructor(private readonly logger: Logger) {}

  public myMethod(): void {
    this.logger.debug('Testing, 123');
  }
}
```
