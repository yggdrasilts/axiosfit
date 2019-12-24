import { HTTP, GET, Observable, AxiosResponse } from '../../../src';
import { TestRoutes } from '../TestRoutes';

@HTTP(TestRoutes.BASE)
export class TestObservableServiceNoInterceptor {
  private static readonly serviceName = 'TestObservableServiceNoInterceptor';

  @GET(TestRoutes.GET.WITH_REQUEST_INTERCEPTOR.URL)
  public performGetRequestAddingReqInterceptor(): Observable<AxiosResponse<string>> {
    return null;
  }

  @GET(TestRoutes.GET.WITH_RESPONSE_INTERCEPTOR.URL)
  public performGetRequestAddingResInterceptor(): Observable<AxiosResponse<string>> {
    return null;
  }
}
