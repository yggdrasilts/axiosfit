import { CommonResponse } from '../common';

export interface CollectionInfo extends CommonResponse {
  status: number;
  globallyUniqueId: string;
  type: number;
  isSystem: boolean;
  name: string;
}
