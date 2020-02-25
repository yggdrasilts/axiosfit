import { Controller, Get, Logger } from '@nestjs/common';

import { AxiosResponse } from '@yggdrasilts/axiosfit';

import { ArangoDBService } from './arangodb/arangodb.axiosfit.service';

import { Status } from './arangodb/entities';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly arangodbService: ArangoDBService) {}

  @Get('bootstrap')
  async initArangoDB(): Promise<void> {
    this.logger.debug('Initializing ArangoDB with GOT data...');
    await this.arangodbService.initGOTData();
  }

  @Get('status')
  getArangoDBStatus(): Promise<AxiosResponse<Status>> {
    this.logger.debug('Getting ArangoDB status...');
    return this.arangodbService.adminService.getStatus();
  }
}
