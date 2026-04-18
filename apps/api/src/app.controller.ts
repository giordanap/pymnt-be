import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
@Controller()
export class AppController {
  private badService = new AppService();
  @Get('/users')
  getUsers() { return this.badService.getUsers(); }
}
