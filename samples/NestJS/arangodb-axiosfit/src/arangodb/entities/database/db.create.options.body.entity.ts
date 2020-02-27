import { DBCreateOptions } from './db.create.options.entity';
import { User } from '../usermanagement/user.entity';

export interface DBCreateOptionsBody extends DBCreateOptions {
  users?: User[];
}
