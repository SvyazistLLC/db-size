import { Controller, Get } from '@nestjs/common';
import { DbSizeService } from './dbSize.service';

@Controller('db-size')
export class DbSizeController {
  constructor(private readonly dbSizeService: DbSizeService) {}
  @Get()
  async getAll(): Promise<any> {
    return this.dbSizeService.getAll();
  }
}
