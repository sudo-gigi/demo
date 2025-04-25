"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function snakeToCamel(obj) {
    if (Array.isArray(obj)) {
        return obj.map(snakeToCamel);
    }
    else if (obj !== null &&
        typeof obj === 'object' &&
        obj.constructor === Object) {
        return Object.fromEntries(Object.entries(obj).map(([key, value]) => [
            key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase()),
            snakeToCamel(value),
        ]));
    }
    return obj;
}
exports.default = snakeToCamel;
//# sourceMappingURL=snakeToCamelCase.js.map