import { AuthType } from '../types/api';
import { InternalAPI } from './internalApi';
import { Consumers } from './consumers';
import { Syncs } from './syncs';
import { Integrations } from './integrations';
import { Webhooks } from './webhooks';

export class API {
    auth: AuthType;
    token?: string;
    internalApi?: any;
    Consumers : Consumers;
    Syncs : Syncs;
    Integrations: Integrations;
    Webhooks: Webhooks;

    constructor(auth: AuthType) {
        this.auth = auth;
        this._setup();
        this.Consumers = new Consumers(this.internalApi);
        this.Syncs = new Syncs(this.internalApi);
        this.Integrations = new Integrations(this.internalApi);
        this.Webhooks = new Webhooks(this.internalApi);
    }

    private _setup = async () => {
        if (!this.auth.clientId || !this.auth.clientSecret || !this.auth.accountId) {
            throw new Error("Missing mandatory auth parameters");
        }
        this.internalApi = new InternalAPI(this.auth);
    }

}
