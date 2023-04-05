import { operations } from "../types/public-api/schema";
import { InternalAPI } from "./internalApi";
import { Consumer } from "./consumer";
import { chiftOperations } from "../types/public-api/mappings";

const Consumers = (internalApi : InternalAPI) => {
    const _internalApi = internalApi;

    const getConsumers = async () => {
        const { data } = await _internalApi.get<operations[chiftOperations["getConsumers"]]["responses"][200]["content"]["application/json"]>('/consumers');
        return data.map(consumer => Consumer(_internalApi, consumer));
    }

    const createConsumer = async (body: operations[chiftOperations["createConsumer"]]["requestBody"]["content"]["application/json"]) => {
        const { data } = await _internalApi.post<operations[chiftOperations["createConsumer"]]["responses"][200]["content"]["application/json"]>('/consumers', body);
        return Consumer(_internalApi, data);
    }

    const getConsumerById = async (consumerId: string) => {
        const { data } = await _internalApi.get<operations[chiftOperations["getConsumerById"]]["responses"][200]["content"]["application/json"]>(`/consumers/${consumerId}`);
        return Consumer(_internalApi, {...data});
    }

    const getConsumersByName = async (consumerName: string) => {
        const { data } = await _internalApi.get<operations[chiftOperations["getConsumers"]]["responses"][200]["content"]["application/json"]>('/consumers');
        return data.filter(consumer => consumer.name.toLowerCase().indexOf(consumerName.toLocaleLowerCase()) !== -1).map(consumer => Consumer(_internalApi, consumer));
    }

    const updateConsumerById = async (consumerId: string, body: operations[chiftOperations["updateConsumer"]]["requestBody"]["content"]["application/json"]) => {
        const { data } = await _internalApi.patch<operations[chiftOperations["updateConsumer"]]["responses"][200]["content"]["application/json"]>(`/consumers/${consumerId}`, body);
        return Consumer(_internalApi, data);
    }

    const deleteConsumerById = async (consumerId: string) => {
        const { data } = await _internalApi.delete<operations[chiftOperations["deleteConsumerById"]]["responses"][204]>(`/consumers/${consumerId}`);
        return data;
    }

    return {
        getConsumers,
        createConsumer,
        getConsumerById,
        getConsumersByName,
        updateConsumerById,
        deleteConsumerById
    }

}


export {
    Consumers
}
