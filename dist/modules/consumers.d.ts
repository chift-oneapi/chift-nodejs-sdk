import { operations } from "../types/public-api/schema";
import { Consumer } from "./consumer";
import { chiftOperations } from "../types/public-api/mappings";
declare class Consumers {
    private _internalApi;
    constructor(internalApi: any);
    getConsumers: () => Promise<Consumer[]>;
    createConsumer: (body: operations[chiftOperations["createConsumer"]]["requestBody"]["content"]["application/json"]) => Promise<Consumer>;
    getConsumerById: (consumerId: string) => Promise<Consumer>;
    getConsumersByName: (consumerName: string) => Promise<Consumer[]>;
    updateConsumerById: (consumerId: string, body: operations[chiftOperations["updateConsumer"]]["requestBody"]["content"]["application/json"]) => Promise<Consumer>;
    deleteConsumerById: (consumerId: string) => Promise<never>;
}
export { Consumers };
