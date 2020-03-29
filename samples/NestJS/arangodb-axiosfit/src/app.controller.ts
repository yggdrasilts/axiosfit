import { Controller, Get, Logger } from '@nestjs/common';

import { ArangoDBService } from './arangodb/arangodb.axiosfit.service';

import { Status } from './arangodb/entities';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly arangodbService: ArangoDBService) {}

  @Get('bootstrap')
  async initArangoDB(): Promise<string> {
    this.logger.debug('Initializing ArangoDB with GOT data...');
    await this.arangodbService.initGOTData();
    return 'Game Of Thrones data added to ArangoDB server.';
  }

  @Get('status')
  async getArangoDBStatus(): Promise<Status> {
    this.logger.debug('Getting ArangoDB status...');
    return (await this.arangodbService.adminService.getStatus()).data;
  }
}
