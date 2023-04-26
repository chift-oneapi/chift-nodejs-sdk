export interface TriggerType {
    type: 'timer' | 'event';
    data?: any;
}

export interface ContextType {
    description?: string;
    config?: any;
}

export interface SimpleResponseModel {
    status: string;
    message: string;
    data?: any;
}
