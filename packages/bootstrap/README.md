[npm]: https://img.shields.io/npm/v/@motech-development/bootstrap
[npm-url]: https://www.npmjs.com/package/@motech-development/bootstrap
[size]: https://packagephobia.now.sh/badge?p=@motech-development/bootstrap
[size-url]: https://packagephobia.now.sh/result?p=@motech-development/bootstrap
[sonar]: https://sonarcloud.io/api/project_badges/measure?project=motech-development_microservices_1&metric=alert_status
[sonar-url]: https://sonarcloud.io/summary/new_code?id=motech-development_microservices_1

[![npm][npm]][npm-url]
[![size][size]][size-url]
[![sonar][sonar]][sonar-url]

# @motech-development/bootstrap

> Bootstrap NestJS REST API and microservice applications

Quickly get a NestJS app up and running with built in network logging, input validation and application crash logging. Supports both Nest applications and microservices.

## Installation

Add `@motech-development/bootstrap` as a dependency.

```bash
# Yarn
yarn add @motech-development/bootstrap

# NPM
npm i @motech-development/bootstrap
```

## Usage

Use the bootstrap on your application entry point.

```typescript
import { bootstrap } from '@motech-development/bootstrap';

const api = NestFactory.create(RestApiModule);

const service = NestFactory.createMicroservice(MicroserviceModule);

const port = 8080; // Optional. Defaults to 3000. Can also be set using the PORT environment variable.

bootstrap(
  {
    api, // Optional
    service, // Optional
  },
  port,
);
```
