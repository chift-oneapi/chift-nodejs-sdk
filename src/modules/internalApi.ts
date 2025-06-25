import axios, { AxiosInstance } from 'axios';
import { AuthType, TokenType, RequestData } from '../types/api';
import Settings from '../helpers/settings';

class InternalAPI {
    instance: AxiosInstance;
    auth: AuthType;
    token?: TokenType;
    debug = false;
    relatedChainExecutionId?: string;
    connectionId?: string;
    integrationId?: string;
    get;
    post;
    patch;
    delete;

    constructor(auth: AuthType) {
        // add interceptor
        this.auth = auth;
        this.instance = axios.create({
            baseURL: this.auth.baseUrl || Settings.BASE_URL,
        });
        this.get = this.instance.get;
        this.post = this.instance.post;
        this.patch = this.instance.patch;
        this.delete = this.instance.delete;

        this.instance.interceptors.request.use(
            (config) => {
                return new Promise((resolve, reject) => {
                    if (this.connectionId) {
                        config.headers['X-Chift-ConnectionId'] = this.connectionId;
                    }

                    if (this.integrationId) {
                        config.headers['X-Chift-IntegrationId'] = this.integrationId;
                    }

                    if (this.relatedChainExecutionId) {
                        config.headers['X-Chift-RelatedChainExecutionId'] =
                            this.relatedChainExecutionId;
                    }

                    if (this.token) {
                        if (this.token?.expires_on < new Date().getTime()) {
                            return this.getToken()
                                .then(() => {
                                    config.headers['Authorization'] =
                                        'Bearer ' + this.token?.access_token;
                                    return resolve(config);
                                })
                                .catch((err) => {
                                    return reject(err);
                                });
                        } else {
                            config.headers['Authorization'] = 'Bearer ' + this.token?.access_token;
                            return resolve(config);
                        }
                    } else {
                        return this.getToken()
                            .then(() => {
                                config.headers['Authorization'] =
                                    'Bearer ' + this.token?.access_token;
                                return resolve(config);
                            })
                            .catch((err) => {
                                return reject(err);
                            });
                    }
                });
            },
            function (error) {
                // Do something with request error
                return Promise.reject(error);
            }
        );
    }

    getToken = async () => {
        try {
            const tokenData: AuthType = {
                clientId: this.auth.clientId,
                clientSecret: this.auth.clientSecret,
                accountId: this.auth.accountId,
            };
            if (this.auth.envId) {
                tokenData['envId'] = this.auth.envId;
            }
            const res = await axios.post(
                `${this.auth.baseUrl || Settings.BASE_URL}/token`,
                tokenData
            );
            this.token = res.data;
        } catch (err: any) {
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    if (err.response.status === 401) {
                        throw new Error('The provided credentials are not correct');
                    }
                }
            }
        }
    };

    getPaginationParams = (currPage: number) => {
        return {
            page: currPage,
            size: 100,
        };
    };

    public setRelatedChainExecutionId(chainExecutionId: string) {
        this.relatedChainExecutionId = chainExecutionId;
    }

    public async makeRequest<TResponse>(requestData: RequestData<TResponse>) {
        try {
            if (this.debug) {
                console.log(
                    `[DEBUG]: Executing operation ${requestData?.property} with url ${requestData.url} for consumer: ${requestData.consumerName}`
                );
            }
            let continuePagination = true;
            let items: any[] = [];
            let currentPage = 0;
            while (continuePagination) {
                currentPage++;
                let params = requestData.params || {};
                if (requestData.method === 'get') {
                    params = {
                        ...params,
                        ...this.getPaginationParams(currentPage),
                    };
                }
                const headers: any = {};
                if (requestData.rawData) {
                    headers['x-chift-raw-data'] = 'true';
                }

                const res = await this.instance({
                    url: requestData.url,
                    method: requestData.method,
                    params: params,
                    data: requestData.body !== undefined ? requestData.body : undefined,
                    headers: headers,
                });
                const { data } = res;
                if (data) {
                    if (requestData.method === 'get' && 'total' in data && 'items' in data) {
                        if (currentPage * 100 > data.total) {
                            continuePagination = false;
                        }
                    } else {
                        if (this.debug) {
                            console.log(`[DEBUG]: Data received: ${JSON.stringify(data)}`);
                        }
                        return data;
                    }
                    items = items.concat(data.items);
                } else {
                    return null;
                }
            }
            if (this.debug) {
                console.log(`[DEBUG]: Data received: ${JSON.stringify(items)}`);
            }
            return items;
        } catch (e: any) {
            if (e.response) {
                if (e.response.data) {
                    const error = { ...e.response.data, status_code: e.response.status };
                    const fullerror = {
                        error,
                        consumerId: requestData.consumerId,
                        consumerName: requestData.consumerName,
                        url: requestData.url,
                    };
                    //return error as TResponse;
                    throw fullerror;
                }
            }
            throw e;
        }
    }
}

export { InternalAPI };
