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
exports.Sync = void 0;
const consumers_1 = require("./consumers");
class Sync {
    constructor(_internalApi, body) {
        this._internalApi = _internalApi;
        this.data = body;
    }
    flow(name, trigger, process, context) {
        return __awaiter(this, void 0, void 0, function* () {
            var fullFunc = process.toString();
            var bodyFunc = fullFunc.slice(fullFunc.indexOf("{") + 1, fullFunc.lastIndexOf("}"));
            if ((context === null || context === void 0 ? void 0 : context.mode) == "debug") {
                this.executeFlow(process);
            }
            else {
                console.log("ici ???");
                const { data } = yield this._internalApi.post(`/syncs/${this.data.syncid}/flows`, {
                    name: name,
                    trigger: {
                        type: trigger.type,
                        data: trigger.data
                    },
                    code: bodyFunc
                });
                return {
                    "message": "The flow was correctly created."
                };
            }
        });
    }
    executeFlow(process) {
        return __awaiter(this, void 0, void 0, function* () {
            this._internalApi.debug = true;
            for (let i = 0; i < this.data.consumers.length; i++) {
                // we do not care about the customer
                const consumer = yield new consumers_1.Consumers(this._internalApi).getConsumerById(this.data.consumers[i]);
                yield process(consumer);
            }
            this._internalApi.debug = false;
        });
    }
    toString() {
        return JSON.stringify(this.data);
    }
}
exports.Sync = Sync;
