import { operations, components } from '../types/public-api/schema';
import { InternalAPI } from './internalApi';
import { chiftOperations } from '../types/public-api/mappings';

const Integrations = (internalApi: InternalAPI) => {
    const _internalApi: InternalAPI = internalApi;

    const getIntegrations = async (
        params: operations[chiftOperations['getIntegrations']]['parameters']['query'] = {}
    ) => {
        const {
            data,
        }: {
            data: operations[chiftOperations['getIntegrations']]['responses'][200]['content']['application/json'];
        } = await _internalApi.get('/integrations', { params });
        return data;
    };

    const getIntegration = async (
        integrationId: number,
        params: operations[chiftOperations['getIntegration']]['parameters']['query'] = {}
    ) => {
        const {
            data,
        }: {
            data: operations[chiftOperations['getIntegration']]['responses'][200]['content']['application/json'];
        } = await _internalApi.get(`/integrations/${integrationId}`, { params });
        return data;
    };

    const getIntegrationLogo = async (
        integrationId: number,
        imageType: components['schemas']['ImageType']
    ) => {
        const { data } = await _internalApi.get(`/integrations/${integrationId}/${imageType}.json`);
        return data;
    };

    return {
        getIntegrations,
        getIntegration,
        getIntegrationLogo,
    };
};

export { Integrations };
