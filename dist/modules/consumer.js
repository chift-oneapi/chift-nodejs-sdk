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
exports.Consumer = void 0;
const pos_1 = require("./pos");
const openapi_1 = require("../helpers/openapi");
const accounting_1 = require("./accounting");
const invoicing_1 = require("./invoicing");
const ecommerce_1 = require("./ecommerce");
class Consumer {
    constructor(_internalApi, body) {
        this._internalApi = _internalApi;
        this.data = body;
        this.consumerid = this.data.consumerid;
        this.name = this.data.name;
        this.redirect_url = this.data.redirect_url;
        this.email = this.data.email;
        this.pos = (0, openapi_1.createApiFor)(pos_1.posFactory, this._internalApi, this.data.name, this.consumerid);
        this.accounting = (0, openapi_1.createApiFor)(accounting_1.accountingFactory, this._internalApi, this.data.name, this.consumerid);
        this.invoicing = (0, openapi_1.createApiFor)(invoicing_1.invoicingFactory, this._internalApi, this.data.name, this.consumerid);
        this.ecommerce = (0, openapi_1.createApiFor)(ecommerce_1.ecommerceFactory, this._internalApi, this.data.name, this.consumerid);
    }
    getConnections() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._internalApi.get(`/consumers/${this.consumerid}/connections`);
            return data;
        });
    }
    createConnection(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._internalApi.post(`/consumers/${this.consumerid}/connections`, Object.assign({}, body));
            return data;
        });
    }
    updateConnection(connectionId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._internalApi.patch(`/consumers/${this.consumerid}/connections/${connectionId}`, Object.assign({}, body));
            return data;
        });
    }
    deleteConnection(connectionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._internalApi.delete(`/consumers/${this.consumerid}/connections/${connectionId}`);
            return data;
        });
    }
    getSyncUrl(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._internalApi.post(`/consumers/${this.consumerid}/syncs`);
            return data;
        });
    }
}
exports.Consumer = Consumer;
