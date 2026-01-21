import { operations } from '../types/public-api/schema';
import { InternalAPI } from './internalApi';

const Issues = (internalApi: InternalAPI) => {
    const _internalApi: InternalAPI = internalApi;

    const getIssues = async (params?: operations['issues_get_issues']['parameters']['query']) => {
        const {
            data,
        }: {
            data: operations['issues_get_issues']['responses'][200]['content']['application/json'];
        } = await _internalApi.get('/issues', { params });
        return data;
    };

    const getIssuesByConsumerId = async (
        consumerId: string,
        params?: operations['issues_get_issues_by_consumer_id']['parameters']['query']
    ) => {
        const {
            data,
        }: {
            data: operations['issues_get_issues_by_consumer_id']['responses'][200]['content']['application/json'];
        } = await _internalApi.get(`/consumers/${consumerId}/issues`, { params });
        return data;
    };

    const getIssue = async (
        issueId: string,
        params?: operations['issues_get_issue']['parameters']['query']
    ) => {
        const {
            data,
        }: {
            data: operations['issues_get_issue']['responses'][200]['content']['application/json'];
        } = await _internalApi.get(`/issues/${issueId}`, { params });
        return data;
    };

    return {
        getIssues,
        getIssuesByConsumerId,
        getIssue,
    };
};

export { Issues };
