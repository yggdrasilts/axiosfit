import { AxiosResponse, HTTP, GET, POST, Path, Body } from '@yggdrasilts/axiosfit';

import { CollectionCreateOptions, CreateCollectionResponse, CollectionInfo } from '../entities';

@HTTP({ usePromises: true, enableAxiosLogger: true })
export class CollectionService {
  @GET('/_db/:db/_api/collection/:collection')
  public getCollectionInfo(@Path('db') db: string, @Path('collection') collection: string): Promise<AxiosResponse<CollectionInfo>> {
    return null;
  }

  @POST('/_db/:db/_api/collection')
  public createCollection(@Path('db') db: string, @Body() body: CollectionCreateOptions): Promise<AxiosResponse<CreateCollectionResponse>> {
    return null;
  }
}
