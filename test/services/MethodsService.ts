import { HTTP, GET, Path, Observable, AxiosResponse } from '../../src';
import { MethodsRoutes } from './MethodsRoutes';

// tslint:disable-next-line: max-classes-per-file
@HTTP(MethodsRoutes.BASE)
export class MethodsService {
  @GET(MethodsRoutes.GET.DEMO.URL)
  public getDemo(): Observable<AxiosResponse<string>> {
    return null;
  }

  @GET(MethodsRoutes.GET.DEMO_WITH_REQUEST_INTERCEPTOR.URL)
  public getDemoAddingReqInterceptor(): Observable<AxiosResponse<string>> {
    return null;
  }

  @GET(MethodsRoutes.GET.DEMO_WITH_RESPONSE_INTERCEPTOR.URL)
  public getDemoAddingResInterceptor(): Observable<AxiosResponse<string>> {
    return null;
  }

  @GET(MethodsRoutes.GET.WITH_PARAM.URL)
  public getWithParam(@Path(MethodsRoutes.GET.WITH_PARAM.PARAMS.ID) id: string): Observable<AxiosResponse<string>> {
    return null;
  }

  @GET(MethodsRoutes.GET.WITH_PARAMS.URL)
  public getWithParams(
    @Path(MethodsRoutes.GET.WITH_PARAMS.PARAMS.ID) id: string,
    @Path(MethodsRoutes.GET.WITH_PARAMS.PARAMS.ID2) id2: string,
  ): Observable<AxiosResponse<string>> {
    return null;
  }
}
