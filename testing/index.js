// eslint-disable-next-line @typescript-eslint/no-var-requires
const chift = require('@chift/chift-nodejs-sdk');
const client = new chift.API({
    baseUrl: 'http://localhost:8000',
    clientId: 'd14024SONEHSCi4',
    clientSecret: 'rdc1f499BnVqQIzGxhNg',
    accountId: '00fc1383-b743-4c9c-8cd6-a90a3dc811e0',
});

(async () => {
    const data = await (
        await client.Consumers.getConsumerById('661bd4e6-8fb9-4a7d-a031-ce5c8d6ad055')
    ).getDataByDataStoreId('11c24782-521b-4c99-bebd-1e3c9e2f416f', { message: 'test' });
    console.log(data);
    /*
    const syncs = await client.Syncs.getSyncs();
    for (let i = 0; i < syncs.length; i++) {
        if (syncs[i].syncid === "2d75fa70-23c4-4eb6-9eb6-57a6e5cf51d3") {
            const sync = syncs[i];
            const flows = sync.getFlows();
            sync.createFlow("Import accounting from Axonaut", {
                type: "event",
                data: {}
            }, async (consumer) => {
                const invoices = await consumer.invoicing.getInvoicesByType("customer_invoice");
                console.log(invoices);
            }, {});
            break;
        }
    }
    */
})();
