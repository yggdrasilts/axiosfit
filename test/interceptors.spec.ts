import { Axiosfit, AxiosResponse, AxiosError, AxiosfitInterceptor, AxiosRequestConfig } from '../src';

import { TestObservableService } from './services/TestObservableService';
import { TestPromiseService } from './services/TestPromiseService';

import testData from './mockServer/data/testData.json';

describe('Testing Interceptors in MethodsService', () => {
  const errorFunc = (error: AxiosError<any>, done: any) => {
    expect(error).toBeNull();
    done.fail();
  };

  describe('REQUEST INTERCEPTORS', () => {
    it('without parameters using Observables', done => {
      const interceptor: AxiosfitInterceptor = {
        request: {
          onFulFilled: (config: AxiosRequestConfig): AxiosRequestConfig => {
            // tslint:disable-next-line: no-string-literal
            config.headers['authorization'] = 'Bearer token';
            return config;
          },
        },
      };

      const methodsService = new Axiosfit<TestObservableService>()
        .baseUrl(process.env.MOCK_SERVER_URL)
        .addInterceptor(interceptor)
        .create(TestObservableService);

      methodsService.performGetRequestAddingReqInterceptor().subscribe(
        (response: AxiosResponse<string>) => {
          expect(response.data).toHaveProperty('headers.authorization', 'Bearer token');
          done();
        },
        error => errorFunc(error, done),
      );
    });

    describe('Using Promises', () => {
      const interceptor: AxiosfitInterceptor = {
        request: {
          onFulFilled: (config: AxiosRequestConfig): AxiosRequestConfig => {
            // tslint:disable-next-line: no-string-literal
            config.headers['authorization'] = 'Bearer token';
            return config;
          },
        },
      };

      const methodsService = new Axiosfit<TestPromiseService>()
        .baseUrl(process.env.MOCK_SERVER_URL)
        .addInterceptor(interceptor)
        .create(TestPromiseService);

      it('not parameters, not async', done => {
        methodsService
          .performGetRequestAddingReqInterceptor()
          .then((response: AxiosResponse<string>) => {
            expect(response.data).toHaveProperty('headers.authorization', 'Bearer token');
            done();
          })
          .catch(error => errorFunc(error, done));
      });

      it('not parameters, with async', async () => {
        try {
          const axiosResponse = await methodsService.performGetRequestAddingReqInterceptor();
          expect(axiosResponse.data).toHaveProperty('headers.authorization', 'Bearer token');
        } catch (error) {
          expect(error).toBeNull();
        }
      });
    });
  });

  describe('RESPONSE INTERCEPTORS', () => {
    it('without parameters', done => {
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

      const methodsService = new Axiosfit<TestObservableService>()
        .baseUrl(process.env.MOCK_SERVER_URL)
        .addInterceptor(interceptor)
        .create(TestObservableService);

      methodsService.performGetRequestAddingResInterceptor().subscribe(
        (response: AxiosResponse<string>) => {
          expect(response.data).toEqual({ ...testData.GET.performGetRequestAddingResInterceptor.check, newData: 'new' });
          done();
        },
        error => errorFunc(error, done),
      );
    });
  });
});
