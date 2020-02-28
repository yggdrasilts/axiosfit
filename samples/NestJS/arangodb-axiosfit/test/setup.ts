import { GenericContainer } from 'testcontainers';
import { StartedTestContainer } from 'testcontainers/dist/test-container';
import logger from 'testcontainers/dist/logger';

let mockServer: StartedTestContainer;

export const stopMockServer = async () => {
  await mockServer.stop();
  logger.info('Mock Server stopped.');
};

export const startMockServer = async (port: number = 8529): Promise<StartedTestContainer> => {
  let arangoDBserverIP: string;
  let arangoDBserverPort: string;

  try {
    const container = await new GenericContainer('arangodb', '3.6.0');

    mockServer = await container
      .withExposedPorts(port)
      .withEnv('ARANGO_NO_AUTH', '1')
      .start();

    arangoDBserverIP = await mockServer.getContainerIpAddress();
    arangoDBserverPort = String(await mockServer.getMappedPort(port));
    const url = `http://${arangoDBserverIP}:${arangoDBserverPort}`;
    logger.info(url);
    process.env.MOCK_SERVER_URL = url;

    return mockServer;
  } catch (error) {
    logger.error(error);
    await stopMockServer();
    throw new Error(error);
  }
};

export default async () => await startMockServer();
