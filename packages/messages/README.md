[npm]: https://img.shields.io/npm/v/@motech-development/messages
[npm-url]: https://www.npmjs.com/package/@motech-development/messages
[size]: https://packagephobia.now.sh/badge?p=@motech-development/messages
[size-url]: https://packagephobia.now.sh/result?p=@motech-development/messages
[sonar]: https://sonarcloud.io/api/project_badges/measure?project=motech-development_microservices_3&metric=alert_status
[sonar-url]: https://sonarcloud.io/summary/new_code?id=motech-development_microservices_3

[![npm][npm]][npm-url]
[![size][size]][size-url]
[![sonar][sonar]][sonar-url]

# @motech-development/messages

> Normalise broker messages

Constructs a consistent broker message.

## Installation

Add `@motech-development/messages` as a dependency.

```bash
# Yarn
yarn add @motech-development/messages

# NPM
npm i @motech-development/messages
```

## Usage

Use the `message` utility to create a new message.

```typescript
import { message } from '@motech-development/messages';

const dataMsg = message({
  data: {
    anything: 'can',
    go: 'in here',
  },
});

const idMsg = message({
  id: 'your-id-goes-here',
});

const dataWithIdMsg = message({
  data: {
    anything: 'can',
    go: 'in here',
  },
  id: 'your-id-goes-here',
});

client.send('create', dataMsg);

client.send('remove', idMsg);

client.send('update', msg);
```
