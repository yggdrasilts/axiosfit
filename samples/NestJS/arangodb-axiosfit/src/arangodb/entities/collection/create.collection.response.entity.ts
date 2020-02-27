import { CommonResponse, KeyOptions } from '../common';

export interface CreateCollectionResponse extends CommonResponse {
  statusString: string;
  keyOptions: KeyOptions;
  indexBuckets: number;
  globallyUniqueId: string;
  doCompact: boolean;
  waitForSync: boolean;
  journalSize: number;
  isVolatile: boolean;
}
