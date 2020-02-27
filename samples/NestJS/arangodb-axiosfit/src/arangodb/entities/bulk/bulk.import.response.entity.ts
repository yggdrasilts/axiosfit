import { CommonResponse } from '../common';

export interface BulkImportResponse extends CommonResponse {
  created: number;
  errors: number;
  empty: number;
  updated: number;
  ignored: number;
}
