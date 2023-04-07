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
