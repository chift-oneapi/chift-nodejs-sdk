import { operations } from '../types/public-api/schema';
import { InternalAPI } from './internalApi';
import { chiftOperations } from '../types/public-api/mappings';

const Integrations = (internalApi: InternalAPI) => {
    const _internalApi: InternalAPI = internalApi;

    const getIntegrations = async () => {
        const { data } = await _internalApi.get<
            operations[chiftOperations['getIntegrations']]['responses'][200]['content']['application/json']
        >('/integrations');
        return data;
    };

    return {
        getIntegrations,
    };
};

export { Integrations };
