import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { AuthType, TokenType, RequestData, RequestFactory, ApiFor } from '../types/api';
import Settings from '../helpers/settings';

class InternalAPI  {
    instance : AxiosInstance;
    auth : AuthType;
    token? : TokenType;
    debug: boolean = false;
    flowId?: string;
    get;
    post;
    patch;
    delete;

    constructor(auth: AuthType) {
        // add interceptor
        this.auth = auth;
        this.instance = axios.create({
            baseURL: (this.auth.baseUrl || Settings.BASE_URL),
        });
        this.get = this.instance.get;
        this.post = this.instance.post;
        this.patch = this.instance.patch;
        this.delete = this.instance.delete;

        this.instance.interceptors.request.use((config) => {
            return new Promise((resolve) => {
                if (this.flowId) {
                    config.headers['X-Chift-FlowID'] = this.flowId;
                }
                if (this.token) {
                    if(this.token?.expires_on < new Date().getTime()) {
                        return this.getToken().then(() => {
                            config.headers['Authorization'] = 'Bearer ' + this.token?.access_token;
                            return resolve(config);
                        })
                    } else {
                        config.headers['Authorization'] = 'Bearer ' + this.token?.access_token;
                        return resolve(config);
                    }
                } else {
                    return this.getToken().then(() => {
                        config.headers['Authorization'] = 'Bearer ' + this.token?.access_token;
                        return resolve(config);
                    })
                }
        })
          }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        });
    }

    getToken = async () => {
        try {
            const tokenData : AuthType = {
                "clientId": this.auth.clientId,
                "clientSecret": this.auth.clientSecret,
                "accountId": this.auth.accountId,
            };
            if (this.auth.envId) {
                tokenData['envId'] = this.auth.envId;
            }
            const res = await axios.post(`${(this.auth.baseUrl || Settings.BASE_URL)}/token`, tokenData)
            this.token = res.data;
        } catch (err : any | AxiosError) {
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    if (err.response.status === 401) {
                        throw new Error("The provided credentials are not correct")
                    }
                }
            }
        }
    }

    getPaginationParams = (currPage: number) => {
        return {
            page: currPage,
            size: 100
        }
    }

    public setFlowId(flowId: string) {
        this.flowId = flowId;
    }

    public async makeRequest<TResponse>(requestData: RequestData<TResponse>) {
        try {
            if (this.debug) {
                console.log(`[DEBUG]: Executing operation ${requestData?.property} for consumer: ${requestData.consumerName}`)
            }
            let continuePagination = true;
            let items : any[] = [];
            let currentPage = 0;
            const headers : any = {};
            while(continuePagination) {
                currentPage++;
                const res = await this.instance({
                    url: requestData.url,
                    method: requestData.method,
                    params: requestData.params ? {...requestData.params, ...this.getPaginationParams(currentPage)} : this.getPaginationParams(currentPage),
                    data: requestData.body !== undefined 
                    ? JSON.stringify(requestData.body) 
                    : undefined
                })
                const { data} = res;
                if (data.total) {
                    if ((currentPage*100)>data.total) {
                        continuePagination = false;
                    }
                } else {
                    if (this.debug) {
                        console.log(`[DEBUG]: Data received: ${JSON.stringify(data)}`)
                    }
                    return data;
                }
                items = items.concat(data.items);
            }
            if (this.debug) {
                console.log(`[DEBUG]: Data received: ${JSON.stringify(items)}`)
            }
            return items;
        } catch (e : any) {
          if (e.response) {
            if (e.response.data) {
                return { ...e.response.data, status_code: e.response.status } as TResponse;
            }
          }
          throw e
        }
    }
      


}

/*
backboneApiInstance.
  return backboneApiInstance;
*/

export { InternalAPI };