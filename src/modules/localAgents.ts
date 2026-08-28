import { operations } from '../types/public-api/schema';
import { InternalAPI } from './internalApi';
import { chiftOperations } from '../types/public-api/mappings';

const LocalAgents = (internalApi: InternalAPI) => {
    const _internalApi: InternalAPI = internalApi;

    const getReleases = async (
        params: operations[chiftOperations['getLocalAgentReleases']]['parameters']['query']
    ) => {
        const {
            data,
        }: {
            data: operations[chiftOperations['getLocalAgentReleases']]['responses'][200]['content']['application/json'];
        } = await _internalApi.get('/local-agents/releases', { params });
        return data;
    };

    return {
        getReleases,
    };
};

export { LocalAgents };
