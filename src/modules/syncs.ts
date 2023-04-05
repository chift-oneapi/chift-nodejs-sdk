import { operations } from "../types/public-api/schema";
import { InternalAPI } from "./internalApi";
import { chiftOperations } from "../types/public-api/mappings";
import { Sync } from "./sync";

const Syncs = (internalApi: InternalAPI) => {
    const _internalApi: InternalAPI = internalApi;

    const getSyncs = async () => {
        const { data } = await _internalApi.get<operations[chiftOperations["getSyncs"]]["responses"][200]["content"]["application/json"]>('/syncs');
        return data.map(sync => Sync(_internalApi, sync));
    }

    const getSyncById = async (syncid : string) => {
        const { data } = await _internalApi.get<operations[chiftOperations["getSync"]]["responses"][200]["content"]["application/json"]>(`/syncs/${syncid}`);
        return Sync(_internalApi, data);
    }

    return {
        getSyncs,
        getSyncById
    }

}


export {
    Syncs
}
