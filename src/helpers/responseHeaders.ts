export type DatalayerSource = 'datalayer' | 'classic';

export interface DatalayerHeaders {
    source: DatalayerSource;
    syncedAt?: Date;
    /** ISO date (YYYY-MM-DD), kept as a string so no timezone shifts the day. */
    coveredFrom?: string;
}

export interface CombinedDatalayerHeaders {
    // 'mixed' when the responses disagree: the backend picks the source per request, so an
    // 'if_available' pagination can fall back to the live connector part way through.
    source: DatalayerSource | 'mixed';
    syncedAt?: Date;
    coveredFrom?: string;
}

/** The headers of one response, with the request that produced it. */
export class ResponseHeaders {
    private parsedDatalayer?: DatalayerHeaders | null;

    constructor(
        readonly headers: Headers,
        readonly method: string,
        readonly path: string,
        readonly status: number
    ) {}

    get(name: string): string | null {
        return this.headers.get(name);
    }

    /** Undefined when the request did not ask for the datalayer. */
    get datalayer(): DatalayerHeaders | undefined {
        if (this.parsedDatalayer === undefined) {
            this.parsedDatalayer = this.parseDatalayer();
        }
        return this.parsedDatalayer ?? undefined;
    }

    private parseDatalayer(): DatalayerHeaders | null {
        const source = this.get('x-chift-datalayer-source');
        if (!source) {
            return null;
        }
        const syncedAt = parseDate(this.get('x-chift-datalayer-synced-at'));
        const coveredFrom = this.get('x-chift-datalayer-covered-from') || undefined;
        return { source: source as DatalayerSource, syncedAt, coveredFrom };
    }
}

/** One `ResponseHeaders` per request, in the order they were sent. */
export class CapturedHeaders {
    readonly responses: ResponseHeaders[] = [];

    get last(): ResponseHeaders | undefined {
        return this.responses[this.responses.length - 1];
    }

    /**
     * Freshness across every captured response, taking the worst case of each field so that it
     * holds for all the data read: the oldest sync and the latest start of coverage.
     */
    get datalayer(): CombinedDatalayerHeaders | undefined {
        const seen = this.responses
            .map((response) => response.datalayer)
            .filter((freshness): freshness is DatalayerHeaders => freshness !== undefined);
        if (seen.length === 0) {
            return undefined;
        }
        const sources = new Set(seen.map((freshness) => freshness.source));
        const synced = seen.map((freshness) => freshness.syncedAt).filter(isDefined);
        const covered = seen.map((freshness) => freshness.coveredFrom).filter(isDefined);
        return {
            source: sources.size === 1 ? seen[0].source : 'mixed',
            syncedAt: synced.length
                ? new Date(Math.min(...synced.map((date) => date.getTime())))
                : undefined,
            // ISO dates order the same way as strings
            coveredFrom: covered.length ? covered.sort()[covered.length - 1] : undefined,
        };
    }
}

const isDefined = <T>(value: T | undefined): value is T => value !== undefined;

const parseDate = (value: string | null): Date | undefined => {
    if (!value) {
        return undefined;
    }
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? undefined : date;
};
