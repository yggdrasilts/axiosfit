# Axiosfit

Axiosfit is a project inspired by [Retrofit](https://square.github.io/retrofit/) to create declarative HTTP clients using [axios](https://github.com/axios/axios) and [RxJS](https://rxjs-dev.firebaseapp.com/) to manage the requests using all the observable powers.

## Install

`npm i @yggdrasilts/axiosfit`

## Usage

### Available Decorators

#### Class Decorator
* @HTTP(endpointPath?: string)

### Example

- Create class with the endpoints methods:

```typescript
import { HTTP, GET, Path, Observable, AxiosResponse } from '@yggdrasilts/axiosfit';

@HTTP('/testing')
export class TestingClient {
  @GET('/demo')
  public demo(): Observable<AxiosResponse<string>> {
    return null;
  }

  @GET('/demo/:id')
  public demo1(@Path('id') id: string): Observable<AxiosResponse<string>> {
    return null;
  }

  @GET('/demo/:id/:id2')
  public demo2(@Path('id') id: string, @Path('id2') id2: string): Observable<AxiosResponse<string>> {
    return null;
  }
}
```

- Create the `Axiosfit` instance:

```typescript
import { Axiosfit } from '@yggdrasilts/axiosfit';

const testClient = new Axiosfit<TestingClient>().baseUrl('http://localhost:3000').create(TestingClient);
```

- Call methods using observables:

```typescript
import { AxiosResponse, AxiosError } from '@yggdrasilts/axiosfit';

const okFunc = (response: AxiosResponse<string>) => console.log('OK', response.data);
const errorFunc = (error: AxiosError<any>) => console.error('KO', error);

testClient
  .getTestingClient()
  .demo()
  .subscribe(okFunc, errorFunc);
```
