export interface TriggerType {
    type: 'timer' | 'event';
    data: any;
}
export interface ContextType {
    mode?: 'debug' | 'platform';
}
