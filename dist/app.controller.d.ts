import { AppService } from './app.service';
import { Request } from 'express';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(request: Request): {
        message: string;
    };
    root(): {
        message: string;
    };
    health(request: Request): {
        message: string;
    };
}
