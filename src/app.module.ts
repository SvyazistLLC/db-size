import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbSizeModule } from './dbSize/dbSize.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), DbSizeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
