"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractModelAction = void 0;
const pagination_helper_1 = require("./helpers/pagination.helper");
class AbstractModelAction {
    repository;
    model;
    constructor(repository, model) {
        this.repository = repository;
        this.model = model;
    }
    async create(createRecordOptions) {
        const { createPayload, transactionOptions } = createRecordOptions;
        const modelRepository = transactionOptions.useTransaction
            ? transactionOptions.transaction.getRepository(this.model)
            : this.repository;
        const response = (await modelRepository.save(createPayload));
        return response;
    }
    async update(updateRecordOptions) {
        const { updatePayload, identifierOptions, transactionOptions } = updateRecordOptions;
        const modelRepository = transactionOptions.useTransaction
            ? transactionOptions.transaction.getRepository(this.model)
            : this.repository;
        await modelRepository.update(identifierOptions, updatePayload);
        return await modelRepository.findOne({ where: identifierOptions });
    }
    async delete(deleteRecordOptions) {
        const { identifierOptions, transactionOptions } = deleteRecordOptions;
        const modelRepository = transactionOptions.useTransaction
            ? transactionOptions.transaction.getRepository(this.model)
            : this.repository;
        return await modelRepository.delete(identifierOptions);
    }
    async get(getRecordIdentifierOptions, queryOptions, relations) {
        return await this.repository.findOne({
            where: getRecordIdentifierOptions,
            ...queryOptions,
            relations,
        });
    }
    async list(listRecordOptions) {
        const { paginationPayload, filterRecordOptions, relations } = listRecordOptions;
        if (paginationPayload) {
            const { limit, page } = paginationPayload;
            const query = await this.repository.find({
                where: filterRecordOptions,
                relations,
                take: +limit,
                skip: +limit * (+page - 1),
            });
            const total = await this.repository.count({ where: filterRecordOptions });
            return {
                payload: query,
                paginationMeta: (0, pagination_helper_1.computePaginationMeta)(total, +limit, +page),
            };
        }
        const query = await this.repository.find({
            where: filterRecordOptions,
            relations,
        });
        return {
            payload: query,
            paginationMeta: { total: query.length },
        };
    }
    async exists(where) {
        return (await this.repository.count({ where })) > 0;
    }
    async updateMany(updateManyRecordOptions) {
        const { updateManyPayload, identifierOptions, transactionOptions } = updateManyRecordOptions;
        const modelRepository = transactionOptions.useTransaction
            ? transactionOptions.transaction.getRepository(this.model)
            : this.repository;
        const updateResult = await modelRepository.update(identifierOptions, updateManyPayload);
        return updateResult;
    }
    async count(where) {
        const count = await this.repository.count({ where });
        return count;
    }
}
exports.AbstractModelAction = AbstractModelAction;
//# sourceMappingURL=abstract-model-action.js.map