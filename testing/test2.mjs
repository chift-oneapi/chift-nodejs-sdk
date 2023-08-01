/* eslint-disable */ 
import chift from '@chift/chift-nodejs-sdk';
import chiftModules from './chift_modules.mjs';
import moment from 'moment/moment.js';
/*
const client = new chift.API({
    baseUrl: 'https://public-api-test.chift.site',
    clientId: 'IzagGvQFLKnFRsW',
    clientSecret: 'NvroyDxDjjA6ylxmotjz',
    accountId: '187cc583-9bea-4fc7-ba87-a2febe3eae46',
});

*/
const client = new chift.API({
    baseUrl: 'http://localhost:8000',
    clientId: 'd14024SONEHSCi4',
    clientSecret: 'rdc1f499BnVqQIzGxhNg',
    accountId: '00fc1383-b743-4c9c-8cd6-a90a3dc811e0',
});

/*
const client = new chift.API({
    clientId: 'pqffoL1XuW3zrn6',
    clientSecret: '8H0TE2ZzKG0a85pER59S',
    accountId: 'da328dc0-744c-4bd6-b637-ba0c63c426ed',
});
*/


(async () => {
    const syncs = await client.Syncs.getSyncs();
    for (let i = 0; i < syncs.length; i++) {
        if (syncs[i].name == "inv to inv") {
            const sync = syncs[i];
            // we have the sync, we can create the flow
            const flow = await sync.createFlow({
                "name": "Migrate orders to orders",
                "description": "Export automatique des factures clients et fournisseurs vers la comptabilité",
                "execution": {
                    "type": "code",
                },
                "trigger": {
                    "type": "event"
                },
                "config": {
                    "datastores": [{
                        "name": "Migrated orders",
                        "definition": {
                            "columns": [{
                                "name": "order_id",
                                "type": "text",
                                "title": "Order id"
                            },
                            {
                                "name": "order_name",
                                "type": "text",
                                "title": "Order name"
                            }]
                        }
                    }]
                }
            }, async (consumer, flowContext) => {
                // for each consumer, we will do the following:
                // get mapping data for tax/journals
                // get invoices that are older than 7 days
                // for each invoice:
                // - check if the client/supplier is already in our datastore, if not create
                // - check if the invoice is already in our datastore, if not Create
                const locations = await consumer.pos.getLocations();
                console.log(locations);
            });
            flow.execute({context: {local: true, logs: true}});
            // stop
            break;
        }
    }
})();
