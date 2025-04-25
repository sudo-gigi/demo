import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get('/hello')
  getHello(@Req() request: Request): { message: string } {
    console.log('user ', request.user);
    return this.appService.getHello();
  }
  @Get()
  root(): { message: string } {
    return { message: 'Welcome to the GamEd API!' };
  }



  


  @Get('/health')
  health(@Req() request: Request) {
    console.log('user ', request.user);
    return this.appService.health();
  }
}
