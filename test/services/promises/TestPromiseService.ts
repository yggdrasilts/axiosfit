import { HTTP, GET, DELETE, HEAD, POST, PUT, PATCH, Path, Body, AxiosResponse } from '../../../src';
import { TestRoutes } from './../TestRoutes';

@HTTP(TestRoutes.BASE, { usePromises: true })
export class TestPromiseService {
  @GET(TestRoutes.GET.REQUEST.URL)
  public performGetRequest(): Promise<AxiosResponse<string>> {
    return null;
  }

  @GET(TestRoutes.GET.WITH_REQUEST_INTERCEPTOR.URL)
  public performGetRequestAddingReqInterceptor(): Promise<AxiosResponse<string>> {
    return null;
  }

  @GET(TestRoutes.GET.WITH_RESPONSE_INTERCEPTOR.URL)
  public performGetRequestAddingResInterceptor(): Promise<AxiosResponse<string>> {
    return null;
  }

  @GET(TestRoutes.GET.WITH_PARAM.URL)
  public performGetRequestUsingAPathVariable(@Path(TestRoutes.GET.WITH_PARAM.PARAMS.ID) id: string): Promise<AxiosResponse<string>> {
    return null;
  }

  @GET(TestRoutes.GET.WITH_PARAMS.URL)
  public performGetRequestUsingPathVariables(
    @Path(TestRoutes.GET.WITH_PARAMS.PARAMS.ID) id: string,
    @Path(TestRoutes.GET.WITH_PARAMS.PARAMS.ID2) id2: string,
  ): Promise<AxiosResponse<string>> {
    return null;
  }

  @DELETE(TestRoutes.DELETE.REQUEST.URL)
  public performDeleteRequest(): Promise<AxiosResponse<string>> {
    return null;
  }

  @HEAD(TestRoutes.HEAD.REQUEST.URL)
  public performHeadRequest(): Promise<AxiosResponse<string>> {
    return null;
  }

  @POST(TestRoutes.POST.REQUEST.URL)
  public performPostRequest(@Body() body: any): Promise<AxiosResponse<any>> {
    return null;
  }

  @PUT(TestRoutes.PUT.REQUEST.URL)
  public performPutRequest(@Body() body: any): Promise<AxiosResponse<any>> {
    return null;
  }

  @PATCH(TestRoutes.PATCH.REQUEST.URL)
  public performPatchRequest(@Body() body: any): Promise<AxiosResponse<any>> {
    return null;
  }
}
