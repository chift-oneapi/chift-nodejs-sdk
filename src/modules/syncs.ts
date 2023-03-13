import { operations } from "../types/public-api/schema";
import { InternalAPI } from "./internalApi";
import { chiftOperations } from "../types/public-api/mappings";
import { Sync } from "./sync";

class Syncs {
    private _internalApi: InternalAPI;

    constructor(internalApi: any) {
        this._internalApi = internalApi;
    }

    getSyncs = async () => {
        const { data } = await this._internalApi.get<operations[chiftOperations["getSyncs"]]["responses"][200]["content"]["application/json"]>('/syncs');
        return data.map(sync => new Sync(this._internalApi, sync));
    }

    getSyncById = async (syncid : string) => {
        const { data } = await this._internalApi.get<operations[chiftOperations["getSync"]]["responses"][200]["content"]["application/json"]>(`/syncs/${syncid}`);
        return new Sync(this._internalApi, data);
    }

}


export {
    Syncs
}
