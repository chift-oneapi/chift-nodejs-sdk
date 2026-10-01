import { CapturedHeaders } from './responseHeaders';

export interface WithResponse<T> {
    data: T;
    headers: CapturedHeaders;
}

/**
 * Resolves to the response data like any promise; `withResponse()` resolves to the data along
 * with the headers of every request it took (one per page when paginating).
 *
 * Extends Promise so existing code typed against `Promise<T>` keeps compiling. The request is
 * sent as soon as the method is called, not when the promise is awaited.
 */
export class ChiftPromise<T> extends Promise<T> {
    // Promise methods build their result through `this.constructor`, which here would call our
    // constructor with an executor instead of a response promise.
    static get [Symbol.species]() {
        return Promise;
    }

    constructor(private readonly responsePromise: Promise<WithResponse<T>>) {
        super((resolve) => resolve(null as T));
    }

    withResponse(): Promise<WithResponse<T>> {
        return this.responsePromise;
    }

    override then<TResult1 = T, TResult2 = never>(
        onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
        onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null
    ): Promise<TResult1 | TResult2> {
        return this.responsePromise.then((response) => response.data).then(onfulfilled, onrejected);
    }

    override catch<TResult = never>(
        onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null
    ): Promise<T | TResult> {
        return this.then(undefined, onrejected);
    }

    override finally(onfinally?: (() => void) | null): Promise<T> {
        return this.then().finally(onfinally);
    }
}
