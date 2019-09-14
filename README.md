# Axiosfit

Axiosfit is a project inspired by [Retrofit](https://square.github.io/retrofit/) to create declarative HTTP clients using [axios](https://github.com/axios/axios) and [RxJS](https://rxjs-dev.firebaseapp.com/) to manage the requests using all the observable powers.

## Install

`npm i @yggdrasilts/axiosfit`

## Documentation

This project use [compodoc](https://compodoc.app/) to generate the full documentation. To see it, executes `npm run compodoc`.

## Usage

### Available Decorators

#### Class Decorators

* [@HTTP(endpointPath?: string)](miscellaneous/functions.html#HTTP)

#### Method Decorators

* [@GET(endpoint: string)](miscellaneous/functions.html#GET)
* [@POST(endpoint: string)](miscellaneous/functions.html#POST)
* [@PUT(endpoint: string)](miscellaneous/functions.html#PUT)
* [@DELETE(endpoint: string)](miscellaneous/functions.html#DELETE)
* [@HEAD(endpoint: string)](miscellaneous/functions.html#HEAD)
* [@PATCH(endpoint: string)](miscellaneous/functions.html#PATCH)

#### Parameter Decorators

* [@Path(paramName: string)](miscellaneous/functions.html#Path)
* [@Body()](miscellaneous/functions.html#Body)

### Example

- Create class with the endpoints methods:

```typescript
import { HTTP, GET, DELETE, HEAD, POST, PUT, PATCH, Path, Body, Observable, AxiosResponse } from '../../src';

@HTTP(MethodsRoutes.BASE)
export class MethodsService {
  @GET(MethodsRoutes.GET.REQUEST.URL)
  public performGetRequest(): Observable<AxiosResponse<string>> {
    return null;
  }

  @GET(MethodsRoutes.GET.WITH_REQUEST_INTERCEPTOR.URL)
  public performGetRequestAddingReqInterceptor(): Observable<AxiosResponse<string>> {
    return null;
  }

  @GET(MethodsRoutes.GET.WITH_RESPONSE_INTERCEPTOR.URL)
  public performGetRequestAddingResInterceptor(): Observable<AxiosResponse<string>> {
    return null;
  }

  @GET(MethodsRoutes.GET.WITH_PARAM.URL)
  public performGetRequestUsingAPathVariable(@Path(MethodsRoutes.GET.WITH_PARAM.PARAMS.ID) id: string): Observable<AxiosResponse<string>> {
    return null;
  }

  @GET(MethodsRoutes.GET.WITH_PARAMS.URL)
  public performGetRequestUsingPathVariables(
    @Path(MethodsRoutes.GET.WITH_PARAMS.PARAMS.ID) id: string,
    @Path(MethodsRoutes.GET.WITH_PARAMS.PARAMS.ID2) id2: string,
  ): Observable<AxiosResponse<string>> {
    return null;
  }

  @DELETE(MethodsRoutes.DELETE.REQUEST.URL)
  public performDeleteRequest(): Observable<AxiosResponse<string>> {
    return null;
  }

  @HEAD(MethodsRoutes.HEAD.REQUEST.URL)
  public performHeadRequest(): Observable<AxiosResponse<string>> {
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
```

- Create the `Axiosfit` instance:

```typescript
import { Axiosfit } from '@yggdrasilts/axiosfit';

const methodsService = new Axiosfit<MethodsService>().baseUrl(process.env.MOCK_SERVER_URL).create(MethodsService);
```

- Call methods using observables:

```typescript
import { AxiosResponse, AxiosError } from '@yggdrasilts/axiosfit';

const okFunc = (response: AxiosResponse<string>) => console.log('OK', response.data);
const errorFunc = (error: AxiosError<any>) => console.error('KO', error);

methodsService
  .performGetRequest()
  .subscribe(okFunc, errorFunc);
```

NOTE: The example code can be seen in the [test](./test) folder.
