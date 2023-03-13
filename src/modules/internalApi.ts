import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { AuthType, TokenType, RequestData, RequestFactory, ApiFor } from '../types/api';
import Settings from '../helpers/settings';

class InternalAPI  {
    instance = axios.create({
        baseURL: Settings.BASE_URL,
    });
    auth : AuthType;
    token? : TokenType;
    debug: boolean = false;

    constructor(auth: AuthType) {
        // add interceptor
        this.auth = auth;
        this.instance.interceptors.request.use((config) => {
            return new Promise((resolve) => {
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
            const res = await axios.post(`${Settings.BASE_URL}/token`, {
                "clientId": this.auth.clientId,
                "clientSecret": this.auth.clientSecret,
                "accountId": this.auth.accountId,
            })
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

    public async makeRequest<TResponse>(requestData: RequestData<TResponse>) {
        try {
            if (this.debug) {
                console.log(`[DEBUG]: Executing operation ${requestData?.property} for consumer: ${requestData.consumerName}`)
            }
            let continuePagination = true;
            let items : any[] = [];
            let currentPage = 0;
            while(continuePagination) {
                currentPage++;
                const res = await this.instance({
                    url: requestData.url,
                    method: requestData.method,
                    params: requestData.params ? {...requestData.params, ...this.getPaginationParams(currentPage)} : this.getPaginationParams(currentPage),
                    data: requestData.body !== undefined 
                    ? JSON.stringify(requestData.body) 
                    : undefined,
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
      

    get = this.instance.get

    post = this.instance.post

    patch = this.instance.patch

    delete = this.instance.delete
}

/*
backboneApiInstance.
  return backboneApiInstance;
*/

export { InternalAPI };