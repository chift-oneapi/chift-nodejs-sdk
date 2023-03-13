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
        this.get = (url) => {
            return this.instance.get(url);
        };
        this.post = this.instance.post;
        // add interceptor
        this.auth = auth;
        this.instance.interceptors.request.use((config) => {
            var _a, _b;
            if (this.token) {
                if (((_a = this.token) === null || _a === void 0 ? void 0 : _a.expires_on) < new Date().getTime()) {
                    return this.getToken().then(() => {
                        return config;
                    });
                }
            }
            config.headers['Authorization'] = 'Bearer ' + ((_b = this.token) === null || _b === void 0 ? void 0 : _b.access_token);
            return config;
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        });
    }
}
exports.InternalAPI = InternalAPI;
