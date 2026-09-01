import { operations, components } from '../types/public-api/schema';
import { InternalAPI } from './internalApi';

const Datalab = (internalApi: InternalAPI) => {
    const _internalApi: InternalAPI = internalApi;

    const getCubeSchemas = async () => {
        const {
            data,
        }: {
            data: operations['datalab_get_cube_schemas']['responses'][200]['content']['application/json'];
        } = await _internalApi.get('/datalab/cube-schemas');
        return data;
    };

    const queryDb = async (body: components['schemas']['CubeLoadQuery']) => {
        const {
            data,
        }: {
            data: operations['datalab_query_db']['responses'][200]['content']['application/json'];
        } = await _internalApi.post('/datalab/query-db', body);
        return data;
    };

    const queryGroupsJoin = async (body: components['schemas']['CubeJoinQuery']) => {
        const {
            data,
        }: {
            data: operations['datalab_query_groups_join']['responses'][200]['content']['application/json'];
        } = await _internalApi.post('/datalab/query-groups-join', body);
        return data;
    };

    return {
        getCubeSchemas,
        queryDb,
        queryGroupsJoin,
    };
};

export { Datalab };
