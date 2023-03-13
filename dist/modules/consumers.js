"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Consumers = void 0;
const consumer_1 = require("./consumer");
class Consumers {
    constructor(internalApi) {
        this.getConsumers = () => __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._internalApi.get('/consumers');
            return data.map(consumer => new consumer_1.Consumer(this._internalApi, consumer));
        });
        this.createConsumer = (body) => __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._internalApi.post('/consumers', body);
            return new consumer_1.Consumer(this._internalApi, data);
        });
        this.getConsumerById = (consumerId) => __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._internalApi.get(`/consumers/${consumerId}`);
            return new consumer_1.Consumer(this._internalApi, Object.assign({}, data));
        });
        this.getConsumersByName = (consumerName) => __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._internalApi.get('/consumers');
            return data.filter(consumer => consumer.name.toLowerCase().indexOf(consumerName.toLocaleLowerCase()) !== -1).map(consumer => new consumer_1.Consumer(this._internalApi, consumer));
        });
        this.updateConsumerById = (consumerId, body) => __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._internalApi.patch(`/consumers/${consumerId}`, body);
            return new consumer_1.Consumer(this._internalApi, data);
        });
        this.deleteConsumerById = (consumerId) => __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._internalApi.delete(`/consumers/${consumerId}`);
            return data;
        });
        this._internalApi = internalApi;
    }
}
exports.Consumers = Consumers;
