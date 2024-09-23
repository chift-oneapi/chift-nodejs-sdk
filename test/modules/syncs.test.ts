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

test('getSyncs', async () => {
    const syncs = await client.Syncs.getSyncs();
    expect(syncs).toBeInstanceOf(Array);
});

test('getSyncById', async () => {
    const syncId = process.env.CHIFT_TEST_SYNC_ID as string;
    const sync = await client.Syncs.getSyncById(syncId);
    expect(sync).toHaveProperty('syncid', syncId);
});
