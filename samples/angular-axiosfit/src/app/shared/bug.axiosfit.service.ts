import {
  Observable,
  AxiosResponse,
  HTTP,
  POST,
  Body,
  GET,
  Path,
  PUT,
  DELETE
} from '@yggdrasilts/axiosfit';

import { Bug } from './bug';

@HTTP('/bugtracking')
export class RestBugService {
  @POST('/')
  public createBug(@Body() data: Bug): Observable<AxiosResponse<Bug>> {
    return null;
  }

  @GET('/:id')
  public getIssue(@Path('id') id: string): Observable<AxiosResponse<Bug>> {
    return null;
  }

  @GET('/')
  public getIssues(): Observable<AxiosResponse<Bug[]>> {
    return null;
  }

  @PUT('/:id')
  public updateBug(
    @Path('id') id: string,
    @Body() data: Bug
  ): Observable<AxiosResponse<Bug>> {
    return null;
  }

  @DELETE('/:id')
  public deleteBug(@Path('id') id: string): Observable<AxiosResponse<void>> {
    return null;
  }
}
