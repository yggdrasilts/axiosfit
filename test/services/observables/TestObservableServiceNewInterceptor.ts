import { HTTP, GET, Observable, AxiosResponse, Interceptors } from '../../../src';
import { TestRoutes } from '../TestRoutes';
import { TestNewInterceptor } from '../interceptors/test.interceptor';

@HTTP(TestRoutes.BASE)
@Interceptors(TestNewInterceptor)
export class TestObservableServiceNewInterceptor {
  private static readonly serviceName = 'TestObservableServiceNewInterceptor';

  @GET(TestRoutes.GET.WITH_REQUEST_INTERCEPTOR.URL)
  public performGetRequestAddingReqInterceptor(): Observable<AxiosResponse<string>> {
    return null;
  }

  @GET(TestRoutes.GET.WITH_RESPONSE_INTERCEPTOR.URL)
  public performGetRequestAddingResInterceptor(): Observable<AxiosResponse<string>> {
    return null;
  }
}
