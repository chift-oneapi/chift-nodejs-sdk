import { components } from '../types/public-api/schema';
import { InternalAPI } from './internalApi';

const Datalab = (internalApi: InternalAPI) => {
    const _internalApi: InternalAPI = internalApi;

    const getCubeSchemas = async () => {
        const { data }: { data: components['schemas']['PublicCubeMetaCube'][] } =
            await _internalApi.get('/datalab/cube-schemas');
        return data;
    };

    const queryDb = async (body: components['schemas']['CubeLoadQuery']) => {
        const { data }: { data: components['schemas']['QueryResponse'] } = await _internalApi.post(
            '/datalab/query-db',
            body
        );
        return data;
    };

    return {
        getCubeSchemas,
        queryDb,
    };
};

export { Datalab };
