export interface Consumers {
    method: void;
}

export interface ConsumerLog {
    type: string;
    message: string;
    context: any;
}
