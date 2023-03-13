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
exports.Webhooks = void 0;
class Webhooks {
    constructor(internalApi) {
        this.getWebhookTypes = () => __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._internalApi.get('/webhooks/list');
            return data;
        });
        this.getWebhooks = () => __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._internalApi.get('/webhooks');
            return data;
        });
        this.registerWebhook = (body) => __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._internalApi.post('/webhooks', body);
            return data;
        });
        this.getWebhookById = (webhookId) => __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._internalApi.get(`/webhooks/${webhookId}`);
            return data;
        });
        this.updateWebhookById = (webhookId, body) => __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._internalApi.patch(`/webhooks/${webhookId}`, body);
            return data;
        });
        this.unRegisterWebhook = (webhookId) => __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._internalApi.delete(`/webhooks/${webhookId}`);
            return data;
        });
        this.getWebhookLogsByWebhookId = (webhookId) => __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._internalApi.get(`/webhooks/${webhookId}/logs`);
            return data;
        });
        this._internalApi = internalApi;
    }
}
exports.Webhooks = Webhooks;
