import { operations, components } from "../types/public-api/schema";
import { InternalAPI } from "./internalApi";
import { chiftOperations } from "../types/public-api/mappings";
import { posFactory } from './pos';
import { createApiFor } from '../helpers/openapi';
import { accountingFactory } from "./accounting";
import { invoicingFactory } from "./invoicing";
import { ecommerceFactory } from "./ecommerce";


class Consumer {
    private _internalApi: InternalAPI;
    public consumerid : string;
    public redirect_url? : string;
    public name;
    public email?: string;
    private data: operations[chiftOperations["getConsumerById"]]["responses"][200]["content"]["application/json"];
    public pos : any;
    public invoicing : any;
    public accounting : any;
    public ecommerce : any;

    constructor(_internalApi: any, body: operations[chiftOperations["getConsumerById"]]["responses"][200]["content"]["application/json"]) {
        this._internalApi = _internalApi;
        this.data = body;
        this.consumerid = this.data.consumerid;
        this.name = this.data.name;
        this.redirect_url = this.data.redirect_url;
        this.email = this.data.email;
        this.pos = createApiFor(posFactory, this._internalApi, this.data.name, this.consumerid);
        this.accounting = createApiFor(accountingFactory, this._internalApi, this.data.name, this.consumerid);
        this.invoicing = createApiFor(invoicingFactory, this._internalApi, this.data.name, this.consumerid);
        this.ecommerce = createApiFor(ecommerceFactory, this._internalApi, this.data.name, this.consumerid);

    }

    public async getConnections() {
        const { data } = await this._internalApi.get<operations[chiftOperations["getConnectionsByConsumerId"]]["responses"][200]["content"]["application/json"]>(`/consumers/${this.consumerid}/connections`);
        return data;
    }

    public async createConnection(body?: components["schemas"]["PostConnectionItem"]) {
        const { data } = await this._internalApi.post<operations[chiftOperations["createConnection"]]["responses"][200]["content"]["application/json"]>(`/consumers/${this.consumerid}/connections`, {...body});
        return data;
    }

    public async updateConnection(connectionId: string, body?: components["schemas"]["PatchConnectionItem"]) {
        const { data } = await this._internalApi.patch<operations[chiftOperations["updateConnection"]]["responses"][200]["content"]["application/json"]>(`/consumers/${this.consumerid}/connections/${connectionId}`, {...body});
        return data;
    }

    public async deleteConnection(connectionId: string) {
        const { data } = await this._internalApi.delete<operations[chiftOperations["deleteConnectionById"]]["responses"][204]>(`/consumers/${this.consumerid}/connections/${connectionId}`);
        return data;
    }

    public async getSyncUrl(body: components["schemas"]["CreateConsumerSyncItem"]) {
        const { data } = await this._internalApi.post<components["schemas"]["LinkSyncItem"]>(`/consumers/${this.consumerid}/syncs`);
        return data;
    }


}



export {
    Consumer
}