// eslint-disable-next-line @typescript-eslint/no-var-requires
const chift = require('@chift/chift-nodejs-sdk');
const client = new chift.API({
    baseUrl: 'http://localhost:8000',
    clientId: 'd14024SONEHSCi4',
    clientSecret: 'rdc1f499BnVqQIzGxhNg',
    accountId: '00fc1383-b743-4c9c-8cd6-a90a3dc811e0',
});

(async () => {
    await client.Syncs.getSyncById('7e75ea56-f640-42d6-bc4d-beafb3c11397');
})();
