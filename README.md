# Axiosfit

Axiosfit is a project inspired by [Retrofit](https://square.github.io/retrofit/) to create declarative HTTP clients using [axios](https://github.com/axios/axios) as the http client for browsers and nodejs, all the [TypeScript](http://www.typescriptlang.org/) features and [RxJS](https://rxjs-dev.firebaseapp.com/) to manage the requests using all the Observable powers (_also, you can use Promises as well_).

## Install

`npm i --save @yggdrasilts/axiosfit`

## Documentation

This project use [compodoc](https://compodoc.app/) to generate the full documentation. To see it, executes `npm run compodoc`.

## Purpose

This project has been thought to be used inside [TypeScript](http://www.typescriptlang.org/) projects to use its incredible features to build frontend or backend applications.

Using [Axiosfit](https://www.npmjs.com/package/@yggdrasilts/axiosfit?activeTab=readme) inside your project, you will be able to organize all your requests as a typical [TypeScript class](https://www.typescriptlang.org/docs/handbook/classes.html). In that way, all of your application requests can be stored in a unique object and be managed. See our [Examples section](#samples_section) to know more about it.

### Available Decorators

As we all know, to build a request is necessary a [URL](https://en.wikipedia.org/wiki/URL) and, using one of the top TypeScript feature, the [TypeScript Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html), Axiosfit give you some specifical Decorators to create an awesome service to store all the information to form your [URL](https://en.wikipedia.org/wiki/URL) to manage your HTTP requests.

#### Class Decorators

- [@HTTP(endpointPath?: string)](miscellaneous/variables.html#HTTP)
- [@Interceptors(...interceptors: AxiosfitInterceptor[])](miscellaneous/variables.html#Interceptors)

**@HTTP** is the main Decorator to configure your Axiosfit service and indicates that the class is an Axiosfit instance. Also, it can be configured with the base path of your API server using its _endpointPath_ property.

#### Method Decorators

- [@GET(endpoint: string)](miscellaneous/variables.html#GET)
- [@POST(endpoint: string)](miscellaneous/variables.html#POST)
- [@PUT(endpoint: string)](miscellaneous/variables.html#PUT)
- [@DELETE(endpoint: string)](miscellaneous/variables.html#DELETE)
- [@HEAD(endpoint: string)](miscellaneous/variables.html#HEAD)
- [@PATCH(endpoint: string)](miscellaneous/variables.html#PATCH)

To request any API server, it is needed to know with method is necessary. For this reason Axiosfit give you Decorators to indicate which method has to be used.

#### Parameter Decorators

- [@Path(paramName: string)](miscellaneous/variables.html#Path)
- [@Body()](miscellaneous/variables.html#Body)

Another part is the _path_ and the _body_ of your request and Axiosfit also has these Decorators to configure your service.

---

Examples of using all of these Decartors are shown in the [Examples section](#samples_section) or you can find specific samples inside the [samples folder](./samples).

---

## Usage

To build an Axiosfit service a few steps need to be done:

### 1. Create a service class

A service class needs to be created because it will store all the requests information. The following code shows a simple service:

```typescript
@HTTP('/simple')
export class SimpleService {
  @GET('/service')
  public getSimpleService(): Observable<AxiosResponse<string>> {
    return null;
  }
}
```

### 2. Create Axiosfit instance

Once the service class is created, the Axiosfit instance can be built:

```typescript
const simpleService = new Axiosfit<SimpleService>().baseUrl('http://simpleservice.com').create(SimpleService);
```

### 3. Perform an Axiosfit request

After all steps, the service can be managed as a typical class:

```typescript
simpleService.getSimpleService().subscribe(axiosResponse => console.log(axiosResponse.data), axiosError => console.error(axiosError));
```

### 4. Using Promises

Axiosfit manage responses using Observables or Promises. The above example shows how to use Observables but, if you prefer use Promises, a minimal change has to be done:

#### 4.1 Modify service class return type

```typescript
@HTTP('/simple')
export class SimpleService {
  @GET('/service')
  public getSimpleService(): Promise<AxiosResponse<string>> {
    return null;
  }
}
```

Once the change is made, you can use Axiosfit response like a typical Promise:

```typescript
simpleService
  .getSimpleService()
  .then(axiosResponse => console.log(axiosResponse.data))
  .catch(axiosError => console.error(axiosError));
```

### Other features

#### Interceptors

Interceptors are other [axios](https://github.com/axios/axios#interceptors) feature that Axiosfit implements.

There are 2 ways to use interceptors:

1. Using the [@Interceptors(...interceptors: AxiosfitInterceptor[])](miscellaneous/variables.html#Interceptors) decorator:

With this first way, the interceptor, or a list of interceptors separated by commas, needs to be added as a decorator parameter:

```typescript
@HTTP('/simple')
@Interceptors(SimpleInterceptor)
export class SimpleService {
  @GET('/service')
  public getSimpleService(): Promise<AxiosResponse<string>> {
    return null;
  }
}
```

```typescript
class SimpleInterceptor implements AxiosfitInterceptor {
  request?: AxiosfitInterceptorRequest;
  response?: AxiosfitInterceptorResponse;

  constructor() {
    this.request = {
      onFulFilled: (config: AxiosRequestConfig): AxiosRequestConfig => {
        // tslint:disable-next-line: no-string-literal
        config.headers['authorization'] = 'Bearer token';
        return config;
      },
    };

    this.response = {
      onFulFilled: (response: AxiosResponse): AxiosResponse => {
        // tslint:disable-next-line: no-string-literal
        const currentData = response.data;
        response.data = {
          ...currentData,
          newData: 'new',
        };
        return response;
      },
    };
  }
}
```

2. Add the interceptor when the Axiosfit service is created.

Using this second method, a request and/or response interceptors must be created when the Axiosfit instance is created.

```typescript
const simpleService = new Axiosfit<SimpleService>()
  .baseUrl('http://simpleservice.com')
  .addInterceptor(interceptor)
  .create(SimpleService);
```

##### Request Interceptor

```typescript
const interceptor: AxiosfitInterceptor = {
  request: {
    onFulFilled: (config: AxiosRequestConfig): AxiosRequestConfig => {
      // tslint:disable-next-line: no-string-literal
      config.headers['authorization'] = 'Bearer token';
      return config;
    },
  },
};
```

##### Response Interceptor

```typescript
const interceptor: AxiosfitInterceptor = {
  response: {
    onFulFilled: (response: AxiosResponse): AxiosResponse => {
      // tslint:disable-next-line: no-string-literal
      const currentData = response.data;
      response.data = {
        ...currentData,
        newData: 'new',
      };
      return response;
    },
  },
};
```

## <a name="samples_section"></a>Examples

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
  .subscribe((response: AxiosResponse<string>) => console.log('OK', response.data), (error: AxiosError<any>) => console.error('KO', error));
```

- Using Promises:

```typescript
import { AxiosResponse, AxiosError } from '@yggdrasilts/axiosfit';

methodsService
  .performGetRequest()
  .then((response: AxiosResponse<string>) => console.log('OK', response.data))
  .catch((error: AxiosError<any>) => console.error('KO', error));
```

NOTE: The example code can be seen in the [test](./test) folder.
