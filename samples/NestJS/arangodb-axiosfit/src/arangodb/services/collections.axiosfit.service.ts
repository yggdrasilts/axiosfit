import { AxiosResponse, HTTP, GET, POST, Path, Body } from '@yggdrasilts/axiosfit';

import { CollectionCreateOptions, CreateCollectionResponse, CollectionInfo } from '../entities';

@HTTP({ usePromises: true, enableAxiosLogger: true })
export class CollectionService {
  /**
   * Return information about a collection.
   *
   * @param {string} db The name of the database.
   * @param {string} collection The name of the collection.
   * @returns {Promise<AxiosResponse<CollectionInfo>>} Data {@link CollectionInfo}
   * @memberof CollectionService
   */
  @GET('/_db/:db/_api/collection/:collection')
  public getCollectionInfo(@Path('db') db: string, @Path('collection') collection: string): Promise<AxiosResponse<CollectionInfo>> {
    return null;
  }

  /**
   * Create collection.
   *
   * @param {string} db The name of the database.
   * @param {CollectionCreateOptions} body {@link CollectionCreateOptions}
   * @returns {Promise<AxiosResponse<CreateCollectionResponse>>} Data {@link CreateCollectionResponse}
   * @memberof CollectionService
   */
  @POST('/_db/:db/_api/collection')
  public createCollection(@Path('db') db: string, @Body() body: CollectionCreateOptions): Promise<AxiosResponse<CreateCollectionResponse>> {
    return null;
  }
}
