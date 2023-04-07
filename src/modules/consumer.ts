import { operations, components } from '../types/public-api/schema';
import { InternalAPI } from './internalApi';
import { chiftOperations } from '../types/public-api/mappings';
import { posFactory } from './pos';
import { createApiFor } from '../helpers/openapi';
import { accountingFactory } from './accounting';
import { invoicingFactory } from './invoicing';
import { ecommerceFactory } from './ecommerce';
import { customFactory } from './custom';

const Consumer = (
    internalApi: InternalAPI,
    body: operations[chiftOperations['getConsumerById']]['responses'][200]['content']['application/json']
) => {
    const _internalApi = internalApi;
    const data = body;
    const consumerId = data.consumerid;
    const name = data.name;
    const redirect_url = data.redirect_url;
    const email = data.email;
    const pos = createApiFor(posFactory, _internalApi, data.name, consumerId);
    const accounting = createApiFor(accountingFactory, _internalApi, data.name, consumerId);
    const invoicing = createApiFor(invoicingFactory, _internalApi, data.name, consumerId);
    const ecommerce = createApiFor(ecommerceFactory, _internalApi, data.name, consumerId);
    const custom = createApiFor(customFactory, _internalApi, data.name, consumerId);

    const getConnections = async () => {
        const { data } = await _internalApi.get<
            operations[chiftOperations['getConnectionsByConsumerId']]['responses'][200]['content']['application/json']
        >(`/consumers/${consumerId}/connections`);
        return data;
    };

    const createConnection = async (body?: components['schemas']['PostConnectionItem']) => {
        const { data } = await _internalApi.post<
            operations[chiftOperations['createConnection']]['responses'][200]['content']['application/json']
        >(`/consumers/${consumerId}/connections`, { ...body });
        return data;
    };

    const updateConnection = async (
        connectionId: string,
        body?: components['schemas']['PatchConnectionItem']
    ) => {
        const { data } = await _internalApi.patch<
            operations[chiftOperations['updateConnection']]['responses'][200]['content']['application/json']
        >(`/consumers/${consumerId}/connections/${connectionId}`, { ...body });
        return data;
    };

    const deleteConnection = async (connectionId: string) => {
        const { data } = await _internalApi.delete<
            operations[chiftOperations['deleteConnectionById']]['responses'][204]
        >(`/consumers/${consumerId}/connections/${connectionId}`);
        return data;
    };

    const getSyncUrl = async () => {
        const { data } = await _internalApi.post<components['schemas']['LinkSyncItem']>(
            `/consumers/${consumerId}/syncs`
        );
        return data;
    };

    return {
        consumerId,
        getConnections,
        createConnection,
        updateConnection,
        deleteConnection,
        getSyncUrl,
        name,
        redirect_url,
        email,
        pos,
        accounting,
        invoicing,
        ecommerce,
        custom,
    };
};

export { Consumer };
