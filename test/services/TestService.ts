import { HTTP, GET, AxiosResponse, Param, ParamMap, Observable, IParamMap } from '../../src';
import { TestRoutes } from './TestRoutes';

@HTTP(TestRoutes.BASE)
export class TestService {
  @GET(TestRoutes.GET.REQUEST.URL)
  public performGetRequest(): AxiosResponse<string> {
    return null;
  }

  @GET(TestRoutes.GET.REQUEST.URL)
  public performGetRequestWithParams(@Param('test') test: string, @ParamMap('testMap') map: IParamMap): Observable<AxiosResponse<string>> {
    return null;
  }
}
