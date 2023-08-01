export interface TriggerType {
    type: 'timer' | 'event';
    data?: any;
}

export interface ExecutionType {
    type: 'code' | 'module';
    data?: any;
}

export interface ContextType {
    name: string;
    description?: string;
    trigger: TriggerType;
    execution: ExecutionType;
    config?: any;
}

export interface SimpleResponseModel {
    status: string;
    message: string;
    data?: any;
}
