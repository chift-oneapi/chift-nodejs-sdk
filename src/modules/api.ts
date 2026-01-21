import { AuthType } from '../types/api';
import { InternalAPI } from './internalApi';
import { Consumers } from './consumers';
import { Syncs, SyncsAPI } from './syncs';
import { Integrations } from './integrations';
import { Webhooks } from './webhooks';
import { DataStores } from './datastores';
import { Issues } from './issues';

export class API {
    auth: AuthType;
    token?: string;
    internalApi?: any;
    Consumers;
    Syncs: SyncsAPI;
    Integrations;
    Webhooks;
    DataStores;
    Issues;

    constructor(auth: AuthType) {
        this.auth = auth;
        this._setup();
        this.Consumers = Consumers(this.internalApi);
        this.Syncs = Syncs(this.internalApi);
        this.Integrations = Integrations(this.internalApi);
        this.Webhooks = Webhooks(this.internalApi);
        this.DataStores = DataStores(this.internalApi);
        this.Issues = Issues(this.internalApi);
    }

    private _setup = async () => {
        if (!this.auth.clientId || !this.auth.clientSecret || !this.auth.accountId) {
            throw new Error('Missing mandatory auth parameters');
        }
        this.internalApi = new InternalAPI(this.auth);
    };
}
