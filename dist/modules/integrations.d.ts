declare class Integrations {
    private _internalApi;
    constructor(internalApi: any);
    getIntegrations: () => Promise<{
        integrationid: number;
        name: string;
        status: "active" | "inactive";
        api: "Point of Sale" | "eCommerce" | "Accounting" | "Invoicing" | "Communication" | "Custom";
        credentials?: {
            name: string;
            optional?: boolean | undefined;
        }[] | undefined;
    }[]>;
}
export { Integrations };
