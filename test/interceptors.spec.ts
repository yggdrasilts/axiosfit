import { Axiosfit, AxiosResponse, AxiosError } from '../src';

import { TestObservableServiceInterceptor } from './services/observables/TestObservableServiceInterceptor';

import testData from './mockServer/data/testData.json';
import { TestPromiseServiceInterceptor } from './services/promises/TestPromiseServiceInterceptor';

describe('Testing Interceptors in MethodsService', () => {
  const errorFunc = (error: AxiosError<any>, done: any) => {
    expect(error).toBeNull();
    done.fail();
  };

  describe('REQUEST INTERCEPTORS', () => {
    it('without parameters using Observables', done => {
      const methodsService = new Axiosfit<TestObservableServiceInterceptor>()
        .baseUrl(process.env.MOCK_SERVER_URL)
        .create(TestObservableServiceInterceptor);

      methodsService.performGetRequestAddingReqInterceptor().subscribe(
        (response: AxiosResponse<string>) => {
          expect(response.data).toHaveProperty('headers.authorization', 'Bearer token');
          done();
        },
        error => errorFunc(error, done),
      );
    });

    describe('Using Promises', () => {
      const methodsService = new Axiosfit<TestPromiseServiceInterceptor>()
        .baseUrl(process.env.MOCK_SERVER_URL)
        .create(TestPromiseServiceInterceptor);

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
      const methodsService = new Axiosfit<TestObservableServiceInterceptor>()
        .baseUrl(process.env.MOCK_SERVER_URL)
        .create(TestObservableServiceInterceptor);

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
