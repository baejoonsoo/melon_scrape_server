import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ChartType } from './entities/chart';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  main(): string {
    return '<h1>melon chart</h1>';
  }

  @Get('melon')
  async getMelonChart(): Promise<ChartType> {
    return await this.appService.getMelonChart();
  }
}
