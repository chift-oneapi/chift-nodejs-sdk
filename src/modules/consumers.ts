import { operations } from '../types/public-api/schema';
import { InternalAPI } from './internalApi';
import { Consumer } from './consumer';
import { chiftOperations } from '../types/public-api/mappings';

const Consumers = (internalApi: InternalAPI) => {
    const _internalApi: InternalAPI = internalApi;

    const getConsumers = async () => {
        const {
            data,
        }: {
            data: operations[chiftOperations['getConsumers']]['responses'][200]['content']['application/json'];
        } = await _internalApi.get('/consumers');
        return data.map((consumer) => Consumer(_internalApi, consumer));
    };

    const createConsumer = async (
        body: operations[chiftOperations['createConsumer']]['requestBody']['content']['application/json']
    ) => {
        const {
            data,
        }: {
            data: operations[chiftOperations['createConsumer']]['responses'][200]['content']['application/json'];
        } = await _internalApi.post('/consumers', body);
        return Consumer(_internalApi, data);
    };

    const getConsumerById = async (consumerId: string) => {
        const {
            data,
        }: {
            data: operations[chiftOperations['getConsumerById']]['responses'][200]['content']['application/json'];
        } = await _internalApi.get(`/consumers/${consumerId}`);
        return Consumer(_internalApi, { ...data });
    };

    const getConsumersByName = async (consumerName: string) => {
        const {
            data,
        }: {
            data: operations[chiftOperations['getConsumers']]['responses'][200]['content']['application/json'];
        } = await _internalApi.get('/consumers');
        return data
            .filter(
                (consumer) =>
                    consumer.name.toLowerCase().indexOf(consumerName.toLocaleLowerCase()) !== -1
            )
            .map((consumer) => Consumer(_internalApi, consumer));
    };

    const updateConsumerById = async (
        consumerId: string,
        body: operations[chiftOperations['updateConsumer']]['requestBody']['content']['application/json']
    ) => {
        const {
            data,
        }: {
            data: operations[chiftOperations['updateConsumer']]['responses'][200]['content']['application/json'];
        } = await _internalApi.patch(`/consumers/${consumerId}`, body);
        return Consumer(_internalApi, data);
    };

    const deleteConsumerById = async (consumerId: string) => {
        const {
            data,
        }: { data: operations[chiftOperations['deleteConsumerById']]['responses'][204] } =
            await _internalApi.delete(`/consumers/${consumerId}`);
        return data;
    };

    return {
        getConsumers,
        createConsumer,
        getConsumerById,
        getConsumersByName,
        updateConsumerById,
        deleteConsumerById,
    };
};

export { Consumers };
