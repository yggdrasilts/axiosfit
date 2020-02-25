import { NestFactory } from '@nestjs/core';
import { INestApplication, Logger } from '@nestjs/common';

import { AllExceptionsFilter } from './filters/all-exceptions.filter';

import { startMockServer, stopMockServer } from '../test/setup';

import { AppModule } from './app.module';

let baseUrl = '';
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
    const port: number = Number(process.env.ARANGODB_PORT) || 8529;
    const arangodbServer = await startMockServer();
    const arangoDBserverIP = await arangodbServer.getContainerIpAddress();
    const arangoDBserverPort = String(await arangodbServer.getMappedPort(port));
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
  await app.listen(3000);
}

bootstrap();

process.on('SIGINT', stopArangoDBServer);
process.on('SIGQUIT', stopArangoDBServer);
process.on('SIGTERM', stopArangoDBServer);
