import { HTTP, GET, Observable, AxiosResponse } from '../../src';
import { MethodsRoutes } from './MethodsRoutes';

// tslint:disable-next-line: max-classes-per-file
@HTTP()
export class MethodsServiceNoBase {
  @GET(MethodsRoutes.GET.DEMO.URL)
  public getDemo(): Observable<AxiosResponse<string>> {
    return null;
  }
}
