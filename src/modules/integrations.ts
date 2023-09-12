import { operations } from '../types/public-api/schema';
import { InternalAPI } from './internalApi';
import { chiftOperations } from '../types/public-api/mappings';

const Integrations = (internalApi: InternalAPI) => {
    const _internalApi: InternalAPI = internalApi;

    const getIntegrations = async () => {
        const {
            data,
        }: {
            data: operations[chiftOperations['getIntegrations']]['responses'][200]['content']['application/json'];
        } = await _internalApi.get('/integrations');
        return data;
    };

    return {
        getIntegrations,
    };
};

export { Integrations };
