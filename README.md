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

### Regenerate the OpenAPI schema

```sh
npx openapi-typescript https://api.chift.eu/openapi.json -o src/types/public-api/schema.d.ts
npx prettier --write src/types/public-api/schema.d.ts
```

Compare the result with the existing file. If there are no changes, stop.

### Schema sync workflow

After regenerating `schema.d.ts`, classify the diff before editing modules:

-   **Module updates are needed** when new endpoints are added, existing endpoints are removed or renamed, or schema types referenced in `src/modules` / `test/` change.
-   **A schema-only update is enough** when changes are limited to types, enums, or fields that no module references, or are documentation/formatting-only.

`npm run build` passing does not prove module coverage is complete, but it also does not mean modules must always change. Inspect the schema diff and existing module coverage to decide.

When new public endpoints are added, expose them in the SDK. When only non-breaking schema refinements land and nothing in the modules references the changed symbols, skip module edits.

Finish with a patch version bump in `package.json`, a matching `package-lock.json` update (`npm install --package-lock-only`), a `CHANGELOG.md` entry (separate **Modules** and **Schema** subsections), and a successful `npm run build`.

### Module layout

Inspect `src/modules/` to learn the current structure. In general:

-   Vertical APIs (`accounting`, `banking`, `ecommerce`, `invoicing`, `payment`, `pms`, `pos`, `custom`) use a `*Factory` pattern and are exposed on `consumer.<api>`.
-   Consumer-scoped management APIs (connections, per-consumer syncs, datalayer) live in `consumer.ts`.
-   Sync-level APIs live in `syncs.ts`.
-   Other top-level APIs have matching files in `src/modules/`.

New top-level modules must also be wired in `src/modules/api.ts` (import, property, and constructor assignment) before they are exposed on `client.<api>`.

Follow existing methods in the target module. Copy exact paths from the schema `paths` section — do not guess URLs from operation names.

### Add routes

The library handles pagination. If the route parameters in the schema contain `page` and `size`, use `AutoPaginatedParams<T>` for the route parameters in the module.

If the `query` parameter is optional in the schema, declare `params` as optional in the module. If it is required, make `params` required.

For example, in `accounting.ts`, the `parameters['query']` for `operations['accounting_get_analytic_plans']` should be replaced with `AutoPaginatedParams<operations['accounting_get_analytic_plans']['parameters']['query']>`.

Since `query` is optional, `getAnalyticPlans` should be declared as `getAnalyticPlans(params?: GetAnalyticPlansParams)`.

#### Return types

Do not copy the OpenAPI response type blindly. The SDK runtime shape depends on how the method is wired:

-   **Factory methods** (`*Factory`, exposed on `consumer.<api>`) go through `createApiFor` → `makeRequest`. For paginated `GET` list endpoints, `makeRequest` fetches every page and returns a **flat array** of items. Type these as `RequestData<Item[]>` using the element type from the page schema (e.g. `ContactItem[]`), **not** `ChiftPage_ContactItem_`. Compare with sibling list methods in the same module such as `getClients` or `getPayments`.
-   **Direct `InternalAPI` methods** (`consumer.ts`, `syncs.ts`, …) call `_internalApi` directly and return the raw API response. Type them to match sibling methods in the same file.

Factory methods return `RequestData<...>` with `method`, `url`, and optionally `params`, `body`, `rawData`, or `clientRequestId`.

When adding a method for a new operation, add a corresponding entry in `src/types/public-api/mappings.ts`.

Integration tests in `test/modules/` depend on live credentials and test-environment data. Fix type references there when the schema breaks compilation, but do not add or run integration tests as part of schema sync — failing tests are not a blocker.

For prior examples of schema sync PRs, look at recent commits that touch `schema.d.ts` and `src/modules/`.
