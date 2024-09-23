import { expect, test } from '@jest/globals';
import * as chift from '../../src/index';
import * as dotenv from 'dotenv';
dotenv.config();

const client = new chift.API({
    baseUrl: process.env.CHIFT_BACKBONE_API,
    clientId: process.env.CHIFT_TESTING_CLIENTID as string,
    clientSecret: process.env.CHIFT_TESTING_CLIENTSECRET as string,
    accountId: process.env.CHIFT_TESTING_ACCOUNTID as string,
});

test('getIntegrations', async () => {
    const integrations = await client.Integrations.getIntegrations();
    expect(integrations).toBeInstanceOf(Array);
    expect(integrations.length).toBeGreaterThan(0);
    expect(integrations[0]).toHaveProperty('integrationid', expect.any(Number));
    expect(integrations[0]).toHaveProperty('name', expect.any(String));
    expect(integrations[0]).toHaveProperty('status', expect.stringMatching(/^(active|inactive)$/));
    expect(integrations[0]).toHaveProperty('api', expect.any(String));
    expect(integrations[0]).toHaveProperty('credentials', expect.any(Array));
});
