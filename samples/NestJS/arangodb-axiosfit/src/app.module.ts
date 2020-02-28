import { Module, DynamicModule } from '@nestjs/common';

import { AppController } from './app.controller';

import { ArangoDBModule } from './arangodb/arangodb.module';

@Module({})
export class AppModule {
  static register(baseUrl: string): DynamicModule {
    return {
      module: AppModule,
      imports: [ArangoDBModule.register(baseUrl)],
      controllers: [AppController],
    };
  }
}
