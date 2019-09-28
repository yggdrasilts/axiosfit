# Axiosfit

Axiosfit is a project inspired by [Retrofit](https://square.github.io/retrofit/) to create declarative HTTP clients using [axios](https://github.com/axios/axios) and [RxJS](https://rxjs-dev.firebaseapp.com/) to manage the requests using all the Observable powers.

Instead of using Observables you can use Promises as well.

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

  - Using Observables:
```typescript
import { HTTP, GET, DELETE, HEAD, POST, PUT, PATCH, Path, Body, Observable, AxiosResponse } from '../../src';
import { TestRoutes } from './TestRoutes';

@HTTP(TestRoutes.BASE)
export class TestObservableService {
  @GET(TestRoutes.GET.REQUEST.URL)
  public performGetRequest(): Observable<AxiosResponse<string>> {
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
```

  - Using Promises:

```typescript
import { HTTP, GET, DELETE, HEAD, POST, PUT, PATCH, Path, Body, AxiosResponse } from '../../src';
import { TestRoutes } from './TestRoutes';

@HTTP(TestRoutes.BASE)
export class TestService {
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
```

- Create the `Axiosfit` instance:

```typescript
import { Axiosfit } from '@yggdrasilts/axiosfit';

const methodsService = new Axiosfit<TestService>().baseUrl(process.env.MOCK_SERVER_URL).create(TestService);
```

- Call methods using observables:

  - Using Observables:

```typescript
import { AxiosResponse, AxiosError } from '@yggdrasilts/axiosfit';

methodsService
  .performGetRequest()
  .subscribe(
    (response: AxiosResponse<string>) => console.log('OK', response.data),
    (error: AxiosError<any>) => console.error('KO', error)
  );
```

  - Using Promises:

```typescript
import { AxiosResponse, AxiosError } from '@yggdrasilts/axiosfit';

methodsService
  .performGetRequest()
  .then((response: AxiosResponse<string>) => console.log('OK', response.data))
  .catch((error: AxiosError<any>) => console.error('KO', error));
  );
```

NOTE: The example code can be seen in the [test](./test) folder.
