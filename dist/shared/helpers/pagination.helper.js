"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computePaginationMeta = void 0;
const computePaginationMeta = (total, limit, page) => {
    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrevious = page > 1;
    return {
        total,
        limit,
        page,
        totalPages,
        hasNext,
        hasPrevious,
    };
};
exports.computePaginationMeta = computePaginationMeta;
//# sourceMappingURL=pagination.helper.js.map