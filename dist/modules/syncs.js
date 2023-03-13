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
exports.Syncs = void 0;
const sync_1 = require("./sync");
class Syncs {
    constructor(internalApi) {
        this.getSyncs = () => __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._internalApi.get('/syncs');
            return data.map(sync => new sync_1.Sync(this._internalApi, sync));
        });
        this.getSyncById = (syncid) => __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._internalApi.get(`/syncs/${syncid}`);
            return new sync_1.Sync(this._internalApi, data);
        });
        this._internalApi = internalApi;
    }
}
exports.Syncs = Syncs;
