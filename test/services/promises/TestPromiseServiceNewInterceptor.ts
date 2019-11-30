import { HTTP, GET, AxiosResponse, Interceptors } from '../../../src';
import { TestRoutes } from '../TestRoutes';
import { TestNewInterceptor } from '../interceptors/test.interceptor';

@HTTP(TestRoutes.BASE, { usePromises: true })
@Interceptors(TestNewInterceptor)
export class TestPromiseServiceNewInterceptor {
  @GET(TestRoutes.GET.WITH_REQUEST_INTERCEPTOR.URL)
  public performGetRequestAddingReqInterceptor(): Promise<AxiosResponse<string>> {
    return null;
  }

  @GET(TestRoutes.GET.WITH_RESPONSE_INTERCEPTOR.URL)
  public performGetRequestAddingResInterceptor(): Promise<AxiosResponse<string>> {
    return null;
  }
}
