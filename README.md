# Chift Node.js Library

[![npm version](https://img.shields.io/npm/v/@chift/chift-nodejs)](https://www.npmjs.com/package/@chift/chift-nodejs)
[![Build](https://github.com/chift-oneapi/chift-nodejs-sdk/actions/workflows/ci.yml/badge.svg)](https://github.com/chift-oneapi/chift-nodejs-sdk/actions/workflows/ci.yml)
[![Coverage Status](https://coveralls.io/repos/github/chift-oneapi/chift-nodejs-sdk/badge.svg?branch=main)](https://coveralls.io/github/chift-oneapi/chift-nodejs-sdk?branch=main)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

The Chift NodeJS library provides convenient access to the Chift API from
applications written in the NodeJS language (Javascript/Typescript).

## Documentation

See the [API docs](https://docs.chift.eu/docs/chift-api/intro).

## Requirements

Node 18 or higher.

## Installation

Install the package with:

```sh
npm install @chift/chift-nodejs
# or
yarn add @chift/chift-nodejs
```

## Example

```typescript
const chift = require('@chift/chift-nodejs');
const client = new chift.API({
    clientId: process.env.CHIFT_TESTING_CLIENTID,
    clientSecret: process.env.CHIFT_TESTING_CLIENTSECRET,
    accountId: process.env.CHIFT_TESTING_ACCOUNTID,
});
const consumers = await client.Consumers.getConsumers();
// my first consumer has a POS connection
const locations = await consumers[0].pos.getLocations();
```

## Features

### Idempotency with Client Request ID

The SDK supports idempotency for create and update operations using the `x-chift-client-requestid` header. This helps prevent duplicate resource creation. See [developer guide](https://docs.chift.eu/developer-guides/advanced/idempotency#idempotency)

```typescript
// Create a client with idempotency
const client = await consumer.accounting.createClient({ name: 'Acme Corp' }, undefined, {
    clientRequestId: 'unique-request-id-123',
});

// Update a client with idempotency
const updatedClient = await consumer.accounting.updateClient(
    'client-id',
    { name: 'Acme Corporation' },
    undefined,
    { clientRequestId: 'unique-update-id-456' }
);
```

### Raw Data Access

The SDK supports accessing raw data from the API using the `rawData` parameter:

```typescript
// Get raw data from invoices
const rawInvoices = await consumer.accounting.getInvoicesByType(
    'customer_invoice',
    {},
    { rawData: true }
);

// Get raw data from orders
const rawOrders = await consumer.ecommerce.getOrders({}, { rawData: true });
```

## Development

How to generate the typescript schemas from the OpenAPI schema of Chift:

> npx openapi-typescript https://api.chift.eu/openapi.json --output src/types/public-api/schema.d.ts

### Add routes

The library handles pagination. If the route parameters in the schema contain `page` and `size`, you should use the generic type `AutoPaginatedParams<T>` for the route parameters in the module.

If the `query` parameter is optional in the schema, it should also be declared as optional in the module.

For example, in `accounting.ts`, the `parameters['query']` for `operations['accounting_get_analytic_plans']` should be replaced with `AutoPaginatedParams<operations['accounting_get_analytic_plans']['parameters']['query']>`.

Since `query` is optional, the `getAnalyticPlans` function should be declared like this: `getAnalyticPlans(params?: GetAnalyticPlansParams)`.
