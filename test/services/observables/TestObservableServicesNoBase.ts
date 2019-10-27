import { HTTP, GET, Observable, AxiosResponse } from '../../../src';
import { TestRoutes } from '../TestRoutes';

@HTTP()
export class TestObservableServiceNoBase {
  private static readonly serviceName = 'TestObservableServiceNoBase';

  @GET(TestRoutes.GET.REQUEST.URL)
  public performGetRequest(): Observable<AxiosResponse<string>> {
    return null;
  }

  @GET(TestRoutes.GET.ERROR.URL)
  public performGetRequestWithError(): Observable<AxiosResponse<string>> {
    return null;
  }
}
