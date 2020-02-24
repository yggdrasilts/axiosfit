import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

import { ArangoDBService } from './arangodb/arangodb.axiosfit.service';
import { Status } from './arangodb/entities';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: 'BASE_URL',
          useValue: process.env.MOCK_SERVER_URL,
        },
        ArangoDBService,
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return ArangoDB status object', async () => {
      await appController.initArangoDB();
      const status: Status = await appController.getArangoDBStatus();
      expect(status).toHaveProperty('server', 'arango');
      expect(status).toHaveProperty('version');
    });
  });
});
