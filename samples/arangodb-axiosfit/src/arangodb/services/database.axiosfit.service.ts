import { AxiosResponse, HTTP, POST, Body } from '@yggdrasilts/axiosfit';

import { DBCreateOptionsBody, DatabaseResponse } from '../entities';

@HTTP({ usePromises: true, enableAxiosLogger: true })
export class DatabaseService {
  @POST('/_api/database')
  public createDatabase(@Body() body: DBCreateOptionsBody): Promise<AxiosResponse<DatabaseResponse>> {
    return null;
  }
}
