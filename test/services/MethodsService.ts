import { HTTP, GET, DELETE, HEAD, POST, PUT, PATCH, Path, Body, Observable, AxiosResponse } from '../../src';
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

  @DELETE(MethodsRoutes.DELETE.DEMO.URL)
  public deleteDemo(): Observable<AxiosResponse<string>> {
    return null;
  }

  @HEAD(MethodsRoutes.HEAD.DEMO.URL)
  public headDemo(): Observable<AxiosResponse<string>> {
    return null;
  }

  @POST(MethodsRoutes.POST.DEMO.URL)
  public postDemo(@Body() body: any): Observable<AxiosResponse<any>> {
    return null;
  }

  @PUT(MethodsRoutes.PUT.DEMO.URL)
  public putDemo(@Body() body: any): Observable<AxiosResponse<any>> {
    return null;
  }

  @PATCH(MethodsRoutes.PUT.DEMO.URL)
  public patchDemo(@Body() body: any): Observable<AxiosResponse<any>> {
    return null;
  }
}
