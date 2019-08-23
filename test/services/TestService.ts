import { HTTP, GET, Param, Observable, AxiosResponse } from '../../src';

@HTTP('/test')
export class TestService {
  @GET('/demo')
  public getDemo(): Observable<AxiosResponse<string>> {
    return null;
  }

  @GET('/demo/:id')
  public getWithParam(@Param('id') id: string): Observable<AxiosResponse<string>> {
    return null;
  }

  @GET('/demo/:id/:id2')
  public getWithParams(@Param('id') id: string, @Param('id2') id2: string): Observable<AxiosResponse<string>> {
    return null;
  }
}
