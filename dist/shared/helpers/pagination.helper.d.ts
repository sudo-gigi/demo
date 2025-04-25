export interface PaginationMeta {
    total: number;
    limit: number;
    page: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
}
export declare const computePaginationMeta: (total: number, limit: number, page: number) => PaginationMeta;
