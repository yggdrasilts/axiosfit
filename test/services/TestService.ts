import { HTTP, GET, Path, Observable, AxiosResponse } from '../../src';

@HTTP('/test')
export class TestService {
  @GET('/demo')
  public getDemo(): Observable<AxiosResponse<string>> {
    return null;
  }

  @GET('/demo/:id')
  public getWithParam(@Path('id') id: string): Observable<AxiosResponse<string>> {
    return null;
  }

  @GET('/demo/:id/:id2')
  public getWithParams(@Path('id') id: string, @Path('id2') id2: string): Observable<AxiosResponse<string>> {
    return null;
  }
}
