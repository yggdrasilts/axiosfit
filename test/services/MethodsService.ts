import { HTTP, GET, DELETE, HEAD, POST, PUT, PATCH, Path, Body, Observable, AxiosResponse } from '../../src';
import { MethodsRoutes } from './MethodsRoutes';

// tslint:disable-next-line: max-classes-per-file
@HTTP(MethodsRoutes.BASE)
export class MethodsService {
  @GET(MethodsRoutes.GET.REQUEST.URL)
  public performGetRequest(): Observable<string> {
    return null;
  }

  @GET(MethodsRoutes.GET.WITH_REQUEST_INTERCEPTOR.URL)
  public performGetRequestAddingReqInterceptor(): Observable<string> {
    return null;
  }

  @GET(MethodsRoutes.GET.WITH_RESPONSE_INTERCEPTOR.URL)
  public performGetRequestAddingResInterceptor(): Observable<string> {
    return null;
  }

  @GET(MethodsRoutes.GET.WITH_PARAM.URL)
  public performGetRequestUsingAPathVariable(@Path(MethodsRoutes.GET.WITH_PARAM.PARAMS.ID) id: string): Observable<string> {
    return null;
  }

  @GET(MethodsRoutes.GET.WITH_PARAMS.URL)
  public performGetRequestUsingPathVariables(
    @Path(MethodsRoutes.GET.WITH_PARAMS.PARAMS.ID) id: string,
    @Path(MethodsRoutes.GET.WITH_PARAMS.PARAMS.ID2) id2: string,
  ): Observable<string> {
    return null;
  }

  @DELETE(MethodsRoutes.DELETE.REQUEST.URL)
  public performDeleteRequest(): Promise<AxiosResponse<string>> {
    return null;
  }

  @HEAD(MethodsRoutes.HEAD.REQUEST.URL)
  public performHeadRequest(): Observable<string> {
    return null;
  }

  @POST(MethodsRoutes.POST.REQUEST.URL)
  public performPostRequest(@Body() body: any): Observable<AxiosResponse<any>> {
    return null;
  }

  @PUT(MethodsRoutes.PUT.REQUEST.URL)
  public performPutRequest(@Body() body: any): Observable<AxiosResponse<any>> {
    return null;
  }

  @PATCH(MethodsRoutes.PATCH.REQUEST.URL)
  public performPatchRequest(@Body() body: any): Observable<AxiosResponse<any>> {
    return null;
  }
}
