import { CommonResponse } from '../common';
import { ServerInfo } from './server.info.entity';

export interface Status extends CommonResponse {
  server: string;
  version: string;
  datapath: string;
  pid: number;
  license: string;
  host: string;
  hostname: string;
  serverInfo: ServerInfo;
}
