import { operations, components } from '../types/public-api/schema';
import { InternalAPI } from './internalApi';
import { chiftOperations } from '../types/public-api/mappings';
import { posFactory } from './pos';
import { pmsFactory } from './pms';
import { paymentFactory } from './payment';
import { createApiFor } from '../helpers/openapi';
import { accountingFactory } from './accounting';
import { invoicingFactory } from './invoicing';
import { ecommerceFactory } from './ecommerce';
import { customFactory } from './custom';
import { bankingFactory } from './banking';
import { SimpleResponseModel } from '../types/sync';
import { ConsumerLog } from '../types/consumers';

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
    const pms = createApiFor(pmsFactory, _internalApi, data.name, consumerId);
    const payment = createApiFor(paymentFactory, _internalApi, data.name, consumerId);
    const accounting = createApiFor(accountingFactory, _internalApi, data.name, consumerId);
    const invoicing = createApiFor(invoicingFactory, _internalApi, data.name, consumerId);
    const ecommerce = createApiFor(ecommerceFactory, _internalApi, data.name, consumerId);
    const custom = createApiFor(customFactory, _internalApi, data.name, consumerId);
    const banking = createApiFor(bankingFactory, _internalApi, data.name, consumerId);

    const setConnectionId = async (connectionId: string) => {
        _internalApi.connectionId = connectionId;
    };

    const setIntegrationId = async (integrationId: string) => {
        _internalApi.integrationId = integrationId;
    };

    const getConnections = async () => {
        const {
            data,
        }: {
            data: operations[chiftOperations['getConnectionsByConsumerId']]['responses'][200]['content']['application/json'];
        } = await _internalApi.get(`/consumers/${consumerId}/connections`);
        return data;
    };

    const createConnection = async (
        body?: components['schemas']['backbone_api__app__routers__connections__PostConnectionItem']
    ) => {
        const {
            data,
        }: {
            data: operations[chiftOperations['createConnection']]['responses'][200]['content']['application/json'];
        } = await _internalApi.post(`/consumers/${consumerId}/connections`, { ...body });
        return data;
    };

    const updateConnection = async (
        connectionId: string,
        body?: components['schemas']['PatchConnectionItem']
    ) => {
        const {
            data,
        }: {
            data: operations[chiftOperations['updateConnection']]['responses'][200]['content']['application/json'];
        } = await _internalApi.patch(`/consumers/${consumerId}/connections/${connectionId}`, {
            ...body,
        });
        return data;
    };

    const deleteConnection = async (connectionId: string) => {
        const {
            data,
        }: { data: operations[chiftOperations['deleteConnectionById']]['responses'][204] } =
            await _internalApi.delete(`/consumers/${consumerId}/connections/${connectionId}`);
        return data;
    };

    const getSyncUrl = async (body: components['schemas']['CreateConsumerSyncItem']) => {
        const { data }: { data: components['schemas']['LinkSyncItem'] } = await _internalApi.post(
            `/consumers/${consumerId}/syncs`,
            body
        );
        return data;
    };

    const getSyncData = async (syncId: string) => {
        const { data }: { data: components['schemas']['SyncConsumerItem'] } =
            await _internalApi.get(`/consumers/${consumerId}/syncs/${syncId}`);
        return data;
    };

    const enableFlow = async (
        syncId: string,
        flowId: string,
        body: components['schemas']['EnableFlowConsumer']
    ) => {
        const { data }: { data: SimpleResponseModel } = await _internalApi.post(
            `/consumers/${consumerId}/syncs/${syncId}/flows/${flowId}/enable`,
            body
        );
        return data;
    };

    const getDataByDataStoreName = async (dataStoreName: string, params?: object) => {
        const { data }: { data: components['schemas']['DataStoreItem'][] } = await _internalApi.get(
            `/datastores`
        );
        for (let i = 0; i < data.length; i++) {
            if (data[i].name == dataStoreName) {
                return await getDataByDataStoreId(data[i].id, params);
            }
        }
        throw Error('Datastore could not be found');
    };

    const getDataByDataStoreId = async (dataStoreId: string, params?: object) => {
        const { data }: { data: components['schemas']['DataItemOut'][] } = await _internalApi.get(
            `/consumers/${consumerId}/datastore/${dataStoreId}/data`,
            { params: params }
        );
        return data;
    };

    const addDataByDataStoreId = async (
        dataStoreId: string,
        data: components['schemas']['DataItem'][]
    ) => {
        const { data: response }: { data: components['schemas']['DataItemOut'][] } =
            await _internalApi.post(`/consumers/${consumerId}/datastore/${dataStoreId}/data`, data);
        return response;
    };

    const addDataByDataStoreName = async (
        dataStoreName: string,
        data: components['schemas']['DataItem'][]
    ) => {
        const { data: datastores }: { data: components['schemas']['DataStoreItem'][] } =
            await _internalApi.get(`/datastores`);
        for (let i = 0; i < datastores.length; i++) {
            if (datastores[i].name == dataStoreName) {
                return await addDataByDataStoreId(datastores[i].id, data);
            }
        }
    };

    const updateDataStoreData = async (
        dataStoreId: string,
        dataStoreDataId: string,
        data: components['schemas']['DataItem']
    ) => {
        const { data: response }: { data: components['schemas']['DataItemOut'][] } =
            await _internalApi.patch(
                `/consumers/${consumerId}/datastore/${dataStoreId}/data/${dataStoreDataId}`,
                data
            );
        return response;
    };

    const deleteDataStoreData = async (dataStoreId: string, dataStoreDataId: string) => {
        const { data: response }: { data: SimpleResponseModel } = await _internalApi.delete(
            `/consumers/${consumerId}/datastore/${dataStoreId}/data/${dataStoreDataId}`
        );
        return response;
    };

    /**
     * This function is used to add logs related to a chainexecution (passed in the header)
     * INTERNAL USE only
     * @param logs
     * @returns
     */
    const logData = async (logs: ConsumerLog[]) => {
        const { data: response }: { data: SimpleResponseModel } = await _internalApi.post(
            `/consumers/${consumerId}/logs`,
            logs
        );
        return response;
    };

    const updateConsumer = async (body: components['schemas']['UpdateConsumerItem']) => {
        const { data }: { data: components['schemas']['ConsumerItem'] } = await _internalApi.patch(
            `/consumers/${consumerId}`,
            body
        );
        return data;
    };

    const updateFlowConfig = async (
        syncId: string,
        flowId: string,
        body: components['schemas']['UpdateFlowConsumer']
    ) => {
        const { data }: { data: components['schemas']['ReadFlowConsumerItem'] } =
            await _internalApi.patch(
                `/consumers/${consumerId}/syncs/${syncId}/flows/${flowId}`,
                body
            );
        return data;
    };

    return {
        consumerId,
        getConnections,
        createConnection,
        updateConnection,
        deleteConnection,
        enableFlow,
        getSyncUrl,
        name,
        redirect_url,
        email,
        pos,
        pms,
        payment,
        accounting,
        invoicing,
        ecommerce,
        custom,
        banking,
        getDataByDataStoreId,
        addDataByDataStoreId,
        getSyncData,
        getDataByDataStoreName,
        addDataByDataStoreName,
        updateDataStoreData,
        deleteDataStoreData,
        logData,
        setConnectionId,
        setIntegrationId,
        updateConsumer,
        updateFlowConfig,
    };
};

export { Consumer };
