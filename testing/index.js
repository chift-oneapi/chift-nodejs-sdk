/* eslint-disable */
const chift = require('@chift/chift-nodejs-sdk');
const client = new chift.API({
    clientId: '',
    clientSecret: '',
    accountId: '',
});

(async () => {
    const syncs = await client.Syncs.getSyncs();
})();
