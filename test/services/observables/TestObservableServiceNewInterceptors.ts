import { HTTP, GET, Observable, AxiosResponse, Interceptors } from '../../../src';
import { TestRoutes } from '../TestRoutes';
import { TestNewInterceptorRequest, TestNewInterceptorResponse } from '../interceptors/test.interceptor';

@HTTP(TestRoutes.BASE)
@Interceptors(TestNewInterceptorRequest, TestNewInterceptorResponse)
export class TestObservableServiceNewInterceptors {
  private static readonly serviceName = 'TestObservableServiceNewInterceptors';

  @GET(TestRoutes.GET.WITH_REQUEST_INTERCEPTOR.URL)
  public performGetRequestAddingReqInterceptor(): Observable<AxiosResponse<string>> {
    return null;
  }

  @GET(TestRoutes.GET.WITH_RESPONSE_INTERCEPTOR.URL)
  public performGetRequestAddingResInterceptor(): Observable<AxiosResponse<string>> {
    return null;
  }
}
