import { Injectable } from '@nestjs/common';
import { ChartType } from './entities/chart';
import scrape from './function/scrape';

@Injectable()
export class AppService {
  async getMelonChart(): Promise<ChartType> {
    return await scrape();
  }
}
