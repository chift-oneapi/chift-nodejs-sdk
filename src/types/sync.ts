interface FlowTriggerOptions {
    autostart?: boolean;
}

export interface FlowTrigger {
    id: string;
    type: 'event' | 'timer';
    cronschedules?: string[];
    definitionFields?: any[];
    visible?: boolean;
    label?: string;
    options?: FlowTriggerOptions;
}

interface FlowConfig {
    datastores?: { id: string; name: string }[];
    definitionFields?: Record<string, unknown>[];
    doorkeyFields?: Record<string, unknown>[];
}

export interface ExecutionType {
    type: 'code' | 'module';
    data?: any;
}

export interface ContextType {
    name: string;
    description?: string;
    triggers: FlowTrigger[];
    execution: ExecutionType;
    config?: FlowConfig;
}

export interface SimpleResponseModel {
    status: string;
    message: string;
    data?: any;
}
