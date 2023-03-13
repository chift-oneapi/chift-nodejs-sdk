import { operations } from "../types/public-api/schema";
import { InternalAPI } from "./internalApi";
import { chiftOperations } from "../types/public-api/mappings";

class Integrations {
    private _internalApi: InternalAPI;

    constructor(internalApi: any) {
        this._internalApi = internalApi;
    }

    getIntegrations = async () => {
        const { data } = await this._internalApi.get<operations[chiftOperations["getIntegrations"]]["responses"][200]["content"]["application/json"]>('/integrations');
        return data;
    }

}

export {
    Integrations
}
