const chift = require("chift");
const test = new chift.API({"clientId": "d14024SONEHSCi4", "clientSecret": "rdc1f499BnVqQIzGxhNg", "accountId": "00fc1383-b743-4c9c-8cd6-a90a3dc811e0"});



(async () => {
    const sync = await test.Syncs.getSyncById('f9a67e2e-ff06-4831-8856-3f8a51b212a4');
    const result = await sync.flow("test last", {
        "type": "event",
        "data": {}
    }, async (consumer) => {
        console.log("Bonjour");
        const locations = await consumer.pos.getLocations();
    })
    console.log(result);
})();