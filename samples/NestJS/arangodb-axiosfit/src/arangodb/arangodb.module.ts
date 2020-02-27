import { Module, DynamicModule } from '@nestjs/common';

import { ArangoDBService } from './arangodb.axiosfit.service';

@Module({})
export class ArangoDBModule {
  static register(baseUrl: string): DynamicModule {
    return {
      module: ArangoDBModule,
      providers: [
        {
          provide: 'BASE_URL',
          useValue: baseUrl,
        },
        ArangoDBService,
      ],
      exports: [ArangoDBService],
    };
  }
}
