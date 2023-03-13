import { InternalAPI } from "../modules/internalApi";
import { RequestFactory, ApiFor } from "../types/api";
export declare const getSpecs: () => Promise<void>;
export declare function createApiFor<TFactory extends RequestFactory>(factory: TFactory, internalApi: InternalAPI, consumerName: string, consumerId: string): ApiFor<TFactory>;
