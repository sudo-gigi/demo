"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const custom_exception_1 = require("./custom.exception");
let ValidationPipe = class ValidationPipe {
    async transform(value, { metatype }) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = (0, class_transformer_1.plainToInstance)(metatype, value);
        if (object === null || typeof object !== 'object') {
            throw new custom_exception_1.CustomHttpException({
                errors: {
                    validation: ['Invalid input'],
                },
                message: 'Validation error',
            }, 422);
        }
        const errors = await (0, class_validator_1.validate)(object);
        if (errors.length > 0) {
            throw new custom_exception_1.CustomHttpException(this.transformValidationErrors(errors), 422);
        }
        return value;
    }
    transformValidationErrors(errors) {
        const errorMessages = errors.map((error) => {
            return {
                [error.property]: error.constraints
                    ? Object.values(error.constraints)
                    : ['Unknown validation error'],
            };
        });
        const errorObject = errorMessages.reduce((result, currentError) => {
            return { ...result, ...currentError };
        }, {});
        return { errors: errorObject, message: 'Validation error' };
    }
    toValidate(metatype) {
        const types = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
};
exports.ValidationPipe = ValidationPipe;
exports.ValidationPipe = ValidationPipe = __decorate([
    (0, common_1.Injectable)()
], ValidationPipe);
//# sourceMappingURL=validator.pipe.js.map