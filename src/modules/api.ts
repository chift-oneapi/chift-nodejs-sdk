import { AuthType } from '../types/api';
import { components, operations } from '../types/public-api/schema';
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

    getMcpToken = async (
        consumerId: components['schemas']['MCPAuthItem']['consumerId']
    ): Promise<
        operations['generate_mcp_token_mcp_token_post']['responses'][200]['content']['application/json']
    > => {
        if (!this.internalApi) {
            await this._setup();
        }
        const body: components['schemas']['MCPAuthItem'] = {
            clientId: this.auth.clientId,
            clientSecret: this.auth.clientSecret,
            accountId: this.auth.accountId,
            consumerId,
        };
        if (this.auth.envId) {
            body.envId = this.auth.envId;
        }
        if (this.auth.marketplaceId) {
            body.marketplaceId = this.auth.marketplaceId;
        }
        const { data } = await this.internalApi.post('/mcp-token', body);
        return data;
    };
}
