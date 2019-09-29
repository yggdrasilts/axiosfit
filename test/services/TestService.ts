import { HTTP, GET, AxiosResponse } from '../../src';
import { TestRoutes } from './TestRoutes';

@HTTP(TestRoutes.BASE)
export class TestService {
  @GET(TestRoutes.GET.REQUEST.URL)
  public performGetRequest(): AxiosResponse<string> {
    return null;
  }
}
