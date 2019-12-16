import { HTTP, GET, DELETE, HEAD, POST, PUT, PATCH, Path, Body, Observable, AxiosResponse, Param, ParamMap, IParamMap } from '../../../src';
import { TestRoutes } from '../TestRoutes';

@HTTP(TestRoutes.BASE)
export class TestObservableService {
  private static readonly serviceName = 'TestObservableService';

  @GET(TestRoutes.GET.REQUEST.URL)
  public performGetRequest(): Observable<AxiosResponse<string>> {
    return null;
  }

  @GET(TestRoutes.GET.REQUEST.URL)
  public performGetRequestWithParameter(@Param('id') id: string): Observable<AxiosResponse<string>> {
    return null;
  }

  @GET(TestRoutes.GET.REQUEST.URL)
  public performGetRequestWithParametersMap(@ParamMap('map') map: IParamMap): Observable<AxiosResponse<string>> {
    return null;
  }

  @GET(TestRoutes.GET.REQUEST.URL)
  public performGetRequestWithParameters(
    @Param('id1') id1: string,
    @Param('id2') id2: string,
    @ParamMap('map') map: IParamMap,
  ): Observable<AxiosResponse<string>> {
    return null;
  }

  @GET(TestRoutes.GET.WITH_REQUEST_INTERCEPTOR.URL)
  public performGetRequestAddingReqInterceptor(): Observable<AxiosResponse<string>> {
    return null;
  }

  @GET(TestRoutes.GET.WITH_RESPONSE_INTERCEPTOR.URL)
  public performGetRequestAddingResInterceptor(): Observable<AxiosResponse<string>> {
    return null;
  }

  @GET(TestRoutes.GET.WITH_PARAM.URL)
  public performGetRequestUsingAPathVariable(@Path(TestRoutes.GET.WITH_PARAM.PARAMS.ID) id: string): Observable<AxiosResponse<string>> {
    return null;
  }

  @GET(TestRoutes.GET.WITH_PARAMS.URL)
  public performGetRequestUsingPathVariables(
    @Path(TestRoutes.GET.WITH_PARAMS.PARAMS.ID) id: string,
    @Path(TestRoutes.GET.WITH_PARAMS.PARAMS.ID2) id2: string,
  ): Observable<AxiosResponse<string>> {
    return null;
  }

  @DELETE(TestRoutes.DELETE.REQUEST.URL)
  public performDeleteRequest(): Observable<AxiosResponse<string>> {
    return null;
  }

  @HEAD(TestRoutes.HEAD.REQUEST.URL)
  public performHeadRequest(): Observable<AxiosResponse<string>> {
    return null;
  }

  @POST(TestRoutes.POST.REQUEST.URL)
  public performPostRequest(@Body() body: any): Observable<AxiosResponse<any>> {
    return null;
  }

  @PUT(TestRoutes.PUT.REQUEST.URL)
  public performPutRequest(@Body() body: any): Observable<AxiosResponse<any>> {
    return null;
  }

  @PATCH(TestRoutes.PATCH.REQUEST.URL)
  public performPatchRequest(@Body() body: any): Observable<AxiosResponse<any>> {
    return null;
  }
}
