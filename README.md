# Chift Node.js Library

[![npm version](https://img.shields.io/npm/v/chift-nodejs-sdk)](https://www.npmjs.com/package/@chift/chift-nodejs-sdk)
[![npm downloads](https://img.shields.io/npm/dw/chift-nodejs-sdk)](https://www.npmjs.com/package/@chift/chift-nodejs-sdk)
[![Build](https://github.com/chift-oneapi/chift-nodejs-sdk/actions/workflows/tests.yml/badge.svg)](https://github.com/chift-oneapi/chift-nodejs-sdk/actions/workflows/tests.yml)
[![Coverage Status](https://coveralls.io/repos/github/chift-oneapi/chift-nodejs-sdk/badge.svg?branch=main)](https://coveralls.io/github/chift-oneapi/chift-nodejs-sdk?branch=main)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

https://dev.to/mendoza/how-to-build-a-simple-sdk-on-typescript-21gg

> Generate the typescript schemas from the OpenAPI:
> npx openapi-typescript https://api.chift.eu/openapi.json --output src/types/public-api/schema.d.ts
> npx openapi-typescript http://localhost:8000/openapi.json --output src/types/public-api/schema.d.ts

## Example

```typescript
const chift = require('@chift/chift-nodejs-sdk');
const client = new chift.API({
    clientId: process.env.CHIFT_CLIENT_ID,
    clientSecret: process.env.CHIFT_CLIENT_SECRET,
    accountId: process.env.CHIFT_ACCOUNT_ID,
});
const consumers = await client.Consumers.getConsumers();
```
