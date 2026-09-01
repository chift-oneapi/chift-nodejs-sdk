import { operations } from '../types/public-api/schema';
import { InternalAPI } from './internalApi';

const LocalAgents = (internalApi: InternalAPI) => {
    const _internalApi: InternalAPI = internalApi;

    const getReleases = async (
        params: operations['get_releases_local_agents_releases_get']['parameters']['query']
    ) => {
        const {
            data,
        }: {
            data: operations['get_releases_local_agents_releases_get']['responses'][200]['content']['application/json'];
        } = await _internalApi.get('/local-agents/releases', { params });
        return data;
    };

    return {
        getReleases,
    };
};

export { LocalAgents };
