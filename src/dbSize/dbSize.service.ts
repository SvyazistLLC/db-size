import { Injectable } from '@nestjs/common';
import Sybase = require('sybase-promised');
import { Queries } from './queries';
import { SizeDbResult, SizeResponse } from './types/sizeDbResult.intrface';

@Injectable()
export class DbSizeService {
  private connection: Sybase = null;
  private async connectToSybase(): Promise<void> {
    const connectionOptions: Sybase.ConnectionOptions = {
      host: process.env.HOST,
      port: parseInt(process.env.PORT, 10),
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      dbname: process.env.DBNAME,
    };

    this.connection = new Sybase(connectionOptions);
    await this.connection.connect();
  }
  private async getLogSize(): Promise<SizeDbResult> {
    return this.connection.query(Queries.logSize) as unknown as SizeDbResult;
  }
  private async getDataSize(): Promise<SizeDbResult> {
    return this.connection.query(Queries.dbSize) as unknown as SizeDbResult;
  }

  private buildResult(sizeResult: SizeDbResult): SizeResponse {
    const result: SizeResponse = {};
    sizeResult.forEach(({ DB_NAME: name, UTIL_PRC: value }) => {
      result[name] = parseFloat(value);
    });
    return result;
  }

  async getAll() {
    await this.connectToSybase();
    const logResult = await this.getLogSize();
    const dataResult = await this.getDataSize();
    const logCount = logResult.length;
    const dataCount = logResult.length;
    const log = this.buildResult(logResult);
    const data = this.buildResult(dataResult);
    this.connection.disconnect();
    return {
      log,
      data,
      dbCount: {
        log: logCount,
        data: dataCount,
      },
    };
  }
}
