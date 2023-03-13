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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApiFor = exports.getSpecs = void 0;
const settings_1 = __importDefault(require("./settings"));
const axios_1 = __importDefault(require("axios"));
const getSpecs = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get(settings_1.default.BASE_URL + '/openapi.json');
});
exports.getSpecs = getSpecs;
function createApiFor(factory, internalApi, consumerName, consumerId) {
    return new Proxy(factory, {
        get(target, property) {
            return (...args) => {
                const requestData = target[property](...args);
                requestData.property = property;
                requestData.consumerName = consumerName;
                requestData.url = requestData.url.replace("{consumer_id}", consumerId);
                return internalApi.makeRequest(requestData);
            };
        },
    });
}
exports.createApiFor = createApiFor;
