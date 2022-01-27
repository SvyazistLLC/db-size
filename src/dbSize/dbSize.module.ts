import { Module } from '@nestjs/common';
import { DbSizeController } from './dbSize.controller';
import { DbSizeService } from './dbSize.service';

@Module({
  controllers: [DbSizeController],
  providers: [DbSizeService],
})
export class DbSizeModule {}
