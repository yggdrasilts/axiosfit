import { HTTP, GET, Observable, AxiosResponse, Interceptors } from '../../../src';
import { TestRoutes } from '../TestRoutes';
import { TestInterceptorRequest, TestInterceptorResponse } from '../interceptors/test.interceptor';

@HTTP(TestRoutes.BASE)
@Interceptors(TestInterceptorRequest, TestInterceptorResponse)
export class TestObservableServiceInterceptors {
  private static readonly serviceName = 'TestObservableServiceInterceptors';

  @GET(TestRoutes.GET.WITH_REQUEST_INTERCEPTOR.URL)
  public performGetRequestAddingReqInterceptor(): Observable<AxiosResponse<string>> {
    return null;
  }

  @GET(TestRoutes.GET.WITH_RESPONSE_INTERCEPTOR.URL)
  public performGetRequestAddingResInterceptor(): Observable<AxiosResponse<string>> {
    return null;
  }
}
