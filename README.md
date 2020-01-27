# Axiosfit

![GitHub package.json version](https://img.shields.io/github/package-json/v/yggdrasilts/axiosfit)
![NPM](https://img.shields.io/npm/l/@yggdrasilts/axiosfit)

Axiosfit is a project inspired by [Retrofit](https://square.github.io/retrofit/) to create declarative HTTP clients using [axios](https://github.com/axios/axios) as the http client for browsers and nodejs, all the [TypeScript](http://www.typescriptlang.org/) features and [RxJS](https://rxjs-dev.firebaseapp.com/) to manage the requests using [Reactive programming](https://en.wikipedia.org/wiki/Reactive_programming) and all the Observable powers (_also, you can use Promises as well_).

## Purpose

This project has been thought to be used inside [TypeScript](http://www.typescriptlang.org/) projects to use its incredible features to build frontend and/or backend applications.

Using [Axiosfit](https://www.npmjs.com/package/@yggdrasilts/axiosfit?activeTab=readme) inside your project, you will be able to organize all your requests as a typical [TypeScript class](https://www.typescriptlang.org/docs/handbook/classes.html). In that way, all of your application requests can be stored in a unique object and be managed. See our [Examples section](#samples_section) or our [application samples](./samples) to know more about how to use it.

**IMPORTANT**: [Axiosfit](https://www.npmjs.com/package/@yggdrasilts/axiosfit?activeTab=readme) only works for building frontend applications using [Angular](https://angular.io/) or backend applications using nodejs with [TypeScript](http://www.typescriptlang.org/). Althought [Axiosfit](https://www.npmjs.com/package/@yggdrasilts/axiosfit?activeTab=readme) can be used in a typical [TypeScript](http://www.typescriptlang.org/) application, we strongly recommend to use [NestJS](https://nestjs.com/) framework to build backend applications.

## Install

`npm i --save @yggdrasilts/axiosfit`

## Contributing

If you want to contribute this amazing project, see [CONTRIBUTING Guide](CONTRIBUTING.md).

## Documentation

This project use [compodoc](https://compodoc.app/) to generate the full documentation. To see it, executes `npm run compodoc`.

### Available Decorators

As we all know, to build a request is necessary a [URL](https://en.wikipedia.org/wiki/URL) and, using one of the top TypeScript feature, the [TypeScript Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html), Axiosfit give you some specifical Decorators to create an awesome service to store all the information to form your [URL](https://en.wikipedia.org/wiki/URL) to manage your HTTP requests.

#### Class Decorators

- [@HTTP(endpointPath?: string | AxiosfitConfig, axisofitConfig?: AxiosfitConfig)](miscellaneous/variables.html#HTTP)
- [@Interceptors(...interceptors: AxiosfitInterceptor[])](miscellaneous/variables.html#Interceptors)

**@HTTP** is the main Decorator to configure your Axiosfit service and indicates that the class is an Axiosfit instance. Also, it can be configured with the base path of your API server using its _endpointPath_ property and configure more Axiosfit option using the [AxiosfitConfig](#axiosfitConfig) object.

**@Interceptors** decorator can be use to add interceptors to the requests or responses. These interceptors must implements AxiosfitInterceptor interface and you can add as many as you want separated by comma. You can see the [Interceptors section](#interceptors) for more information.

##### Considerations

**Angular applications**: Due to the uglify process when you build an Angular application with --prod parameters, you need to create a static readonly property called `serviceName` inside the class to give it a unique name that works as unique identifier used by Axiosfit. In the [Usage section](#usage) you can see how to use it. You also have more samples inside the [samples folder](./samples).

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
- [@Param(paramName: string)](miscellaneous/variables.html#Param)
- [@ParamMap(paramName: string)](miscellaneous/variables.html#ParamMap)
- [@Body()](miscellaneous/variables.html#Body)

Another part is the _path_ and the _body_ of your request and Axiosfit also has these Decorators to configure your service.

---

Examples of using all of these Decartors are shown in the [Examples section](#samples_section) or you can find specific samples inside the [samples folder](./samples).

---

#### Configuration

- <a name="axiosfitConfig"></a>AxiosfitConfig
  - _usePromises_: Default _false_. Configure Axiosfit service to return Observable object or a Promise.

## <a name="usage"></a>Usage

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

If you want to use Promises instead of Observable:

```typescript
@HTTP('/simple', { usePromises: true })
export class SimpleService {
  @GET('/service')
  public getSimpleService(): Promise<AxiosResponse<string>> {
    return null;
  }
}
```

#### 1.1 Service class for Angular application uglifying the code to deploy in production

```typescript
@HTTP('/simple')
export class SimpleService {
  private static readonly serviceName = 'SimpleService';

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
simpleService.getSimpleService().subscribe(
  axiosResponse => console.log(axiosResponse.data),
  axiosError => console.error(axiosError),
);
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

## <a name="samples_section"></a>Examples

#### <a name="interceptors"></a>Interceptors

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

In the following sample you can see how to implement it and alse see the differences.

```typescript
export class SimpleInterceptor implements AxiosfitRequestInterceptor, AxiosfitResponseInterceptor {
  onRequest(config: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig> {
    // tslint:disable-next-line: no-string-literal
    config.headers['authorization'] = 'Bearer token';
    return config;
  }

  onResponse(response: AxiosResponse<any>): AxiosResponse<any> | Promise<AxiosResponse<any>> {
    // tslint:disable-next-line: no-string-literal
    const currentData = response.data;
    response.data = {
      ...currentData,
      newData: 'new',
    };
    return response;
  }
}
```

1. Add the interceptor when the Axiosfit service is created.

Using this second method, a request and/or response interceptors must be created when the Axiosfit instance is created.

```typescript
export const simpleService = new Axiosfit<SimpleService>()
  .baseUrl('http://simpleservice.com')
  .addInterceptor(interceptor)
  .create(SimpleService);
```

##### Request Interceptor

```typescript
export class SimpleNewInterceptorRequest implements AxiosfitRequestInterceptor {
  onRequest(config: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig> {
    // tslint:disable-next-line: no-string-literal
    config.headers['authorization'] = 'Bearer token';
    return config;
  }
}
```

##### Response Interceptor

```typescript
export class SimpleInterceptorResponse implements AxiosfitResponseInterceptor {
  onResponse(response: AxiosResponse<any>): AxiosResponse<any> | Promise<AxiosResponse<any>> {
    // tslint:disable-next-line: no-string-literal
    const currentData = response.data;
    response.data = {
      ...currentData,
      newData: 'new',
    };
    return response;
  }
}
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
```

- Using Promises:

```typescript
import { HTTP, GET, DELETE, HEAD, POST, PUT, PATCH, Path, Body, AxiosResponse } from '../../src';
import { TestRoutes } from './TestRoutes';

@HTTP(TestRoutes.BASE, { usePromises: true })
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

methodsService.performGetRequest().subscribe(
  (response: AxiosResponse<string>) => console.log('OK', response.data),
  (error: AxiosError<any>) => console.error('KO', error),
);
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
