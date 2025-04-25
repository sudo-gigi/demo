type ListRecordGeneric<FilterRecordOptions> = {
    filterRecordOptions: FilterRecordOptions;
    relations?: object;
    paginationPayload?: {
        limit: number;
        page: number;
    };
};
export default ListRecordGeneric;
