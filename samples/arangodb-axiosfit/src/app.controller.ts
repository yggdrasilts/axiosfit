import { Controller, Get, Logger } from '@nestjs/common';

import { ArangoDBService } from './arangodb/arangodb.axiosfit.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly arangodbService: ArangoDBService) {}

  @Get('bootstrap')
  async initArangoDB(): Promise<void> {
    this.arangodbService.initGOTData();
  }
}
