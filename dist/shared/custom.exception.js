"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomHttpException = void 0;
const common_1 = require("@nestjs/common");
class CustomHttpException extends common_1.HttpException {
    constructor(response, status) {
        super(response, status);
    }
    getResponse() {
        const response = super.getResponse();
        const status_code = this.getStatus();
        const success = status_code === 201 || status_code === 2000 ? true : false;
        if (typeof response === 'object' && response !== null) {
            const res = response;
            return {
                message: (res.message || 'An error occurred'),
                errors: res.errors,
                success,
            };
        }
        return {
            message: response,
            success,
        };
    }
}
exports.CustomHttpException = CustomHttpException;
//# sourceMappingURL=custom.exception.js.map