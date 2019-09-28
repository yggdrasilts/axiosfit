import { HTTP, GET, AxiosResponse } from '../../src';
import { TestRoutes } from './TestRoutes';

@HTTP()
export class TestPromiseServiceNoBase {
  @GET(TestRoutes.GET.REQUEST.URL)
  public performGetRequest(): Promise<AxiosResponse<string>> {
    return null;
  }

  @GET(TestRoutes.GET.ERROR.URL)
  public performGetRequestWithError(): Promise<AxiosResponse<string>> {
    return null;
  }
}
