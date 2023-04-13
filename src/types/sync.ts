export interface TriggerType {
    type: 'timer' | 'event';
    data?: any;
}

export interface SimpleResponseModel {
    status: string;
    message: string;
    data?: any;
}
