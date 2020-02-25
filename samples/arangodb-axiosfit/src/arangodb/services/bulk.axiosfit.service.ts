import { AxiosResponse, HTTP, POST, ParamMap, Path, Body } from '@yggdrasilts/axiosfit';

import { BulkImportResponse, BulkImportQuery } from '../entities';

@HTTP({ usePromises: true, enableAxiosLogger: true })
export class BulkService {
  /**
   * Import JSON data to arangodb.
   *
   * @param {string} db Database name.
   * @param {BulkImportQuery} options {@link BulkImportQuery}
   * @param {Object} body Json array data.
   * @returns {Promise<AxiosResponse<BulkImportResponse>>} Data {@link BulkImportResponse}
   * @memberof BulkService
   */
  @POST('/_db/:db/_api/import')
  public importJson(
    @Path('db') db: string,
    @ParamMap('options') options: BulkImportQuery,
    @Body() body: Object,
  ): Promise<AxiosResponse<BulkImportResponse>> {
    return null;
  }
}
