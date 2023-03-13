import { Sync } from "./sync";
declare class Syncs {
    private _internalApi;
    constructor(internalApi: any);
    getSyncs: () => Promise<Sync[]>;
    getSyncById: (syncid: string) => Promise<Sync>;
}
export { Syncs };
