import { HttpException, HttpStatus } from '@nestjs/common';
export declare class CustomHttpException extends HttpException {
    constructor(response: string | Record<string, unknown>, status: HttpStatus);
    getResponse(): {
        message: string;
        success: boolean;
        errors?: unknown;
    };
}
