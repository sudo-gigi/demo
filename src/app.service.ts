import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getHello() {
    return { message: 'Hello World!' };
  }

  health() {
    return { message: 'This is an healthy endpoint' };
  }

}
