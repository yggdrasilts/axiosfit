import { NestFactory } from '@nestjs/core';
import { INestApplication, Logger } from '@nestjs/common';

import { AllExceptionsFilter } from './filters/all-exceptions.filter';

import { startMockServer, stopMockServer } from '../test/setup';

import { AppModule } from './app.module';

let baseUrl = '';
const port = process.env.PORT || 3000;
let app: INestApplication;
const logger = new Logger('Bootstrap');

async function stopArangoDBServer() {
  logger.debug('Stopping ArangoDB instance.');
  await stopMockServer();
  logger.debug('ArangoDB instance stopped.');
  app.close();
}

async function startArangoDBServer() {
  try {
    logger.debug('Starting ArangoDB instance.');
    const arangodbPort: number = Number(process.env.ARANGODB_PORT) || 8529;
    const arangodbServer = await startMockServer();
    const arangoDBserverIP = await arangodbServer.getContainerIpAddress();
    const arangoDBserverPort = String(await arangodbServer.getMappedPort(arangodbPort));
    baseUrl = `http://${arangoDBserverIP}:${arangoDBserverPort}`;
    process.env.BASE_URL = baseUrl;
    logger.log(`ArangoDB server running at ${baseUrl}`);
    logger.debug('ArangoDB instance started.');
  } catch (error) {
    logger.error(error);
    await stopArangoDBServer();
  }
}

async function bootstrap() {
  await startArangoDBServer();

  app = await NestFactory.create(AppModule.register(baseUrl));
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(port);
  logger.log(`arangodb-axiosfit application running at http://localhost:${port}`);
}

bootstrap();

process.on('SIGINT', stopArangoDBServer);
process.on('SIGQUIT', stopArangoDBServer);
process.on('SIGTERM', stopArangoDBServer);
