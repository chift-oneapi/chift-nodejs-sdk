import { components, operations } from '../types/public-api/schema';
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

    return {
        getCubeSchemas,
        queryDb,
    };
};

export { Datalab };
