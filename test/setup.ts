import * as path from 'path';

import { GenericContainer } from 'testcontainers';
import { StartedTestContainer } from 'testcontainers/dist/test-container';
import logger from 'testcontainers/dist/logger';

let mockServer: StartedTestContainer;

const startMockServer = async (): Promise<StartedTestContainer> => {
  let mockServerIP: string;
  let mockServerPort: string;

  const buildContext = path.resolve(__dirname);
  logger.info(`BuildContext path: ${buildContext}`);

  const port = 3000;
  try {
    const container = await GenericContainer.fromDockerfile(buildContext).build();

    mockServer = await container.withExposedPorts(3000).start();

    mockServerIP = await mockServer.getContainerIpAddress();
    mockServerPort = String(await mockServer.getMappedPort(port));
    const url = `http://${mockServerIP}:${mockServerPort}`;
    logger.info(`MOCK_SERVER_URL: ${url}`);
    process.env.MOCK_SERVER_URL = url;

    return mockServer;
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
};

export const stopMockServer = async () => {
  await mockServer.stop();
  logger.info('Mock Server stopped.');
};

export default async () => await startMockServer();
