import { QueryType } from './query.type.enum';
import { OnDuplicateAction } from './on.duplicate.action.entity';

export interface BulkImportQuery {
  type: QueryType;
  collection: string;
  fromPrefix?: string;
  toPrefix?: string;
  overwrite?: boolean;
  waitForSync?: boolean;
  onDuplicate?: OnDuplicateAction;
  complete?: boolean;
  details?: boolean;
}
