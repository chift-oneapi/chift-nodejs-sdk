import { components, operations } from '../types/public-api/schema';
import { InternalAPI } from './internalApi';
import { chiftOperations } from '../types/public-api/mappings';

const Datalab = (internalApi: InternalAPI) => {
    const _internalApi: InternalAPI = internalApi;

    const getCubeSchemas = async () => {
        const {
            data,
        }: {
            data: operations[chiftOperations['getCubeSchemas']]['responses'][200]['content']['application/json'];
        } = await _internalApi.get('/datalab/cube-schemas');
        return data;
    };

    const queryDb = async (body: components['schemas']['CubeLoadQuery']) => {
        const {
            data,
        }: {
            data: operations[chiftOperations['queryDb']]['responses'][200]['content']['application/json'];
        } = await _internalApi.post('/datalab/query-db', body);
        return data;
    };

    return {
        getCubeSchemas,
        queryDb,
    };
};

export { Datalab };
