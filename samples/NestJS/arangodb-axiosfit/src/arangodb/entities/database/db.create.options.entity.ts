import { DatabaseOptions } from './database.options.entity';

export interface DBCreateOptions {
  name: string;
  options?: DatabaseOptions;
}
