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
exports.InternalAPI = void 0;
const axios_1 = __importDefault(require("axios"));
const settings_1 = __importDefault(require("../helpers/settings"));
class InternalAPI {
    constructor(auth) {
        this.instance = axios_1.default.create({
            baseURL: settings_1.default.BASE_URL,
        });
        this.debug = false;
        this.getToken = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield axios_1.default.post(`${settings_1.default.BASE_URL}/token`, {
                    "clientId": this.auth.clientId,
                    "clientSecret": this.auth.clientSecret,
                    "accountId": this.auth.accountId,
                });
                this.token = res.data;
            }
            catch (err) {
                if (axios_1.default.isAxiosError(err)) {
                    if (err.response) {
                        if (err.response.status === 401) {
                            throw new Error("The provided credentials are not correct");
                        }
                    }
                }
            }
        });
        this.getPaginationParams = (currPage) => {
            return {
                page: currPage,
                size: 100
            };
        };
        this.get = this.instance.get;
        this.post = this.instance.post;
        this.patch = this.instance.patch;
        this.delete = this.instance.delete;
        // add interceptor
        this.auth = auth;
        this.instance.interceptors.request.use((config) => {
            return new Promise((resolve) => {
                var _a, _b;
                if (this.token) {
                    if (((_a = this.token) === null || _a === void 0 ? void 0 : _a.expires_on) < new Date().getTime()) {
                        return this.getToken().then(() => {
                            var _a;
                            config.headers['Authorization'] = 'Bearer ' + ((_a = this.token) === null || _a === void 0 ? void 0 : _a.access_token);
                            return resolve(config);
                        });
                    }
                    else {
                        config.headers['Authorization'] = 'Bearer ' + ((_b = this.token) === null || _b === void 0 ? void 0 : _b.access_token);
                        return resolve(config);
                    }
                }
                else {
                    return this.getToken().then(() => {
                        var _a;
                        config.headers['Authorization'] = 'Bearer ' + ((_a = this.token) === null || _a === void 0 ? void 0 : _a.access_token);
                        return resolve(config);
                    });
                }
            });
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        });
    }
    makeRequest(requestData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.debug) {
                    console.log(`[DEBUG]: Executing operation ${requestData === null || requestData === void 0 ? void 0 : requestData.property} for consumer: ${requestData.consumerName}`);
                }
                let continuePagination = true;
                let items = [];
                let currentPage = 0;
                while (continuePagination) {
                    currentPage++;
                    const res = yield this.instance({
                        url: requestData.url,
                        method: requestData.method,
                        params: requestData.params ? Object.assign(Object.assign({}, requestData.params), this.getPaginationParams(currentPage)) : this.getPaginationParams(currentPage),
                        data: requestData.body !== undefined
                            ? JSON.stringify(requestData.body)
                            : undefined,
                    });
                    const { data } = res;
                    if (data.total) {
                        if ((currentPage * 100) > data.total) {
                            continuePagination = false;
                        }
                    }
                    else {
                        if (this.debug) {
                            console.log(`[DEBUG]: Data received: ${JSON.stringify(data)}`);
                        }
                        return data;
                    }
                    items = items.concat(data.items);
                }
                if (this.debug) {
                    console.log(`[DEBUG]: Data received: ${JSON.stringify(items)}`);
                }
                return items;
            }
            catch (e) {
                if (e.response) {
                    if (e.response.data) {
                        return Object.assign(Object.assign({}, e.response.data), { status_code: e.response.status });
                    }
                }
                throw e;
            }
        });
    }
}
exports.InternalAPI = InternalAPI;
