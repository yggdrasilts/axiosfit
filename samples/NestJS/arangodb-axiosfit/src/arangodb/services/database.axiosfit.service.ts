import { AxiosResponse, HTTP, POST, Body } from '@yggdrasilts/axiosfit';

import { DBCreateOptionsBody, DatabaseResponse } from '../entities';

@HTTP({ usePromises: true, enableAxiosLogger: true })
export class DatabaseService {
  /**
   * Create database.
   *
   * @param {DBCreateOptionsBody} body {@link DBCreateOptionsBody}
   * @returns {Promise<AxiosResponse<DatabaseResponse>>} Data {@link DatabaseResponse}
   * @memberof DatabaseService
   */
  @POST('/_api/database')
  public createDatabase(@Body() body: DBCreateOptionsBody): Promise<AxiosResponse<DatabaseResponse>> {
    return null;
  }
}
