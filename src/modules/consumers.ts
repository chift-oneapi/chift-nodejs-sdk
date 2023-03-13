import { operations } from "../types/public-api/schema";
import { InternalAPI } from "./internalApi";
import { Consumer } from "./consumer";
import { chiftOperations } from "../types/public-api/mappings";

class Consumers {
    private _internalApi: InternalAPI;

    constructor(internalApi: any) {
        this._internalApi = internalApi;
    }

    getConsumers = async () => {
        const { data } = await this._internalApi.get<operations[chiftOperations["getConsumers"]]["responses"][200]["content"]["application/json"]>('/consumers');
        return data.map(consumer => new Consumer(this._internalApi, consumer));
    }

    createConsumer = async (body: operations[chiftOperations["createConsumer"]]["requestBody"]["content"]["application/json"]) => {
        const { data } = await this._internalApi.post<operations[chiftOperations["createConsumer"]]["responses"][200]["content"]["application/json"]>('/consumers', body);
        return new Consumer(this._internalApi, data);
    }

    getConsumerById = async (consumerId: string) => {
        const { data } = await this._internalApi.get<operations[chiftOperations["getConsumerById"]]["responses"][200]["content"]["application/json"]>(`/consumers/${consumerId}`);
        return new Consumer(this._internalApi, {...data});
    }

    getConsumersByName = async (consumerName: string) => {
        const { data } = await this._internalApi.get<operations[chiftOperations["getConsumers"]]["responses"][200]["content"]["application/json"]>('/consumers');
        return data.filter(consumer => consumer.name.toLowerCase().indexOf(consumerName.toLocaleLowerCase()) !== -1).map(consumer => new Consumer(this._internalApi, consumer));
    }

    updateConsumerById = async (consumerId: string, body: operations[chiftOperations["updateConsumer"]]["requestBody"]["content"]["application/json"]) => {
        const { data } = await this._internalApi.patch<operations[chiftOperations["updateConsumer"]]["responses"][200]["content"]["application/json"]>(`/consumers/${consumerId}`, body);
        return new Consumer(this._internalApi, data);
    }

    deleteConsumerById = async (consumerId: string) => {
        const { data } = await this._internalApi.delete<operations[chiftOperations["deleteConsumerById"]]["responses"][204]>(`/consumers/${consumerId}`);
        return data;
    }

}


export {
    Consumers
}
