# Chift Node.js Library

[![npm version](https://img.shields.io/npm/v/chift)](https://www.npmjs.com/package/chift)
[![npm downloads](https://img.shields.io/npm/dw/chift)](https://www.npmjs.com/package/chift)
[![Build](https://github.com/chift-oneapi/chift-nodejs-sdk/actions/workflows/tests.yml/badge.svg)](https://github.com/chift-oneapi/chift-nodejs-sdk/actions/workflows/tests.yml)
[![Coverage Status](https://coveralls.io/repos/github/chift-oneapi/chift-nodejs-sdk/badge.svg?branch=main)](https://coveralls.io/github/chift-oneapi/chift-nodejs-sdk?branch=main)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

The Chift NodeJS library provides convenient access to the Chift API from
applications written in the NodeJS language (Javascript).

## Documentation

See the [API docs](https://docs.chift.eu/docs/chift-api/intro).

## Requirements

Node 12 or higher.

## Installation

Install the package with:

```sh
npm install chift
# or
yarn add chift
```

## Example

```typescript
const chift = require('chift');
const client = new chift.API({
    clientId: process.env.CHIFT_CLIENT_ID,
    clientSecret: process.env.CHIFT_CLIENT_SECRET,
    accountId: process.env.CHIFT_ACCOUNT_ID,
});
const consumers = await client.Consumers.getConsumers();
// my first consumer has a POS connection
const locations = await consumers[0].pos.getLocations();
```

## Development

How to generate the typescript schemas from the OpenAPI schema of Chift:

> npx openapi-typescript https://api.chift.eu/openapi.json --output src/types/public-api/schema.d.ts
