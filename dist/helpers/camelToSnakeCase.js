"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function camelToSnake(obj) {
    if (Array.isArray(obj)) {
        return obj.map(camelToSnake);
    }
    else if (obj !== null &&
        typeof obj === 'object' &&
        obj.constructor === Object) {
        return Object.fromEntries(Object.entries(obj).map(([key, value]) => [
            key.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase(),
            camelToSnake(value),
        ]));
    }
    return obj;
}
exports.default = camelToSnake;
//# sourceMappingURL=camelToSnakeCase.js.map