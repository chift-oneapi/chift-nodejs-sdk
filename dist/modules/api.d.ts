import { AuthType } from '../types/api';
import { Consumers } from './consumers';
import { Syncs } from './syncs';
import { Integrations } from './integrations';
import { Webhooks } from './webhooks';
export declare class API {
    auth: AuthType;
    token?: string;
    internalApi?: any;
    Consumers: Consumers;
    Syncs: Syncs;
    Integrations: Integrations;
    Webhooks: Webhooks;
    constructor(auth: AuthType);
    private _setup;
}
