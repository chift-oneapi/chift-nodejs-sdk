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
exports.API = void 0;
const internalApi_1 = require("./internalApi");
const consumers_1 = require("./consumers");
const syncs_1 = require("./syncs");
const integrations_1 = require("./integrations");
const webhooks_1 = require("./webhooks");
class API {
    constructor(auth) {
        this._setup = () => __awaiter(this, void 0, void 0, function* () {
            if (!this.auth.clientId || !this.auth.clientSecret || !this.auth.accountId) {
                throw new Error("Missing mandatory auth parameters");
            }
            this.internalApi = new internalApi_1.InternalAPI(this.auth);
        });
        this.auth = auth;
        this._setup();
        this.Consumers = new consumers_1.Consumers(this.internalApi);
        this.Syncs = new syncs_1.Syncs(this.internalApi);
        this.Integrations = new integrations_1.Integrations(this.internalApi);
        this.Webhooks = new webhooks_1.Webhooks(this.internalApi);
    }
}
exports.API = API;
