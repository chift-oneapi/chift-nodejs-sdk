import { beforeAll, expect, test } from '@jest/globals';
import * as chift from '../../src/index';
import * as dotenv from 'dotenv';

dotenv.config();

const client = new chift.API({
    baseUrl: process.env.CHIFT_BASE_URL,
    clientId: process.env.CHIFT_CLIENT_ID as string,
    clientSecret: process.env.CHIFT_CLIENT_SECRET as string,
    accountId: process.env.CHIFT_ACCOUNT_ID as string,
});

const flowName = 'test flow';

let sync: any;
let flow: any;

beforeAll(async () => {
    const syncId = process.env.CHIFT_TEST_SYNC_ID as string;
    sync = await client.Syncs.getSyncById(syncId);
});

test('createFlow', async () => {
    flow = await sync.createFlow(
        {
            name: 'Je suis un flux de test',
            description: 'Flux de test',
            execution: {
                type: 'code',
            },
            trigger: {
                type: 'event',
            },
            config: {},
        },
        async (consumer, flowContext) => {
            console.log(`Mon flow_id : ${flowContext.flow_id}`);
            console.log(`Bonjour, ceci est un test, on exécute le flux pour consumer: ${consumer}`);
        }
    );

    expect(flow).toHaveProperty('flowId');
    expect(flow).toHaveProperty('name', flowName);
});

test('getFlows', async () => {
    const flows = await sync.getFlows();
    expect(flows).toBeInstanceOf(Array);
});

test('getFlowByName', async () => {
    const flowWithName = await sync.getFlowByName(flow.name);
    expect(flowWithName).toHaveProperty('name', flow.name);
});

test('getFlowById', async () => {
    const flowWithId = await sync.getFlowById(flow.flowId);
    expect(flowWithId).toHaveProperty('flowId', flow.flowId);
});
