import { components, operations } from '../types/public-api/schema';
import { InternalAPI } from './internalApi';

const Insights = (internalApi: InternalAPI) => {
    const _internalApi: InternalAPI = internalApi;

    const getCatalog = async () => {
        const {
            data,
        }: {
            data: operations['insights_get_catalog']['responses'][200]['content']['application/json'];
        } = await _internalApi.get('/insights/catalog');
        return data;
    };

    const queryDb = async (body: components['schemas']['CubeLoadQuery']) => {
        const {
            data,
        }: {
            data: operations['insights_query_db']['responses'][200]['content']['application/json'];
        } = await _internalApi.post('/insights/query-db', body);
        return data;
    };

    const queryGroupsJoin = async (body: components['schemas']['CubeJoinQuery']) => {
        const {
            data,
        }: {
            data: operations['insights_query_groups_join']['responses'][200]['content']['application/json'];
        } = await _internalApi.post('/insights/query-groups-join', body);
        return data;
    };

    return {
        getCatalog,
        queryDb,
        queryGroupsJoin,
    };
};

export { Insights };
