import { Axiosfit, AxiosResponse, AxiosError } from '../src';

import { TestObservableServiceInterceptor } from './services/observables/TestObservableServiceInterceptor';
import { TestObservableServiceNoInterceptor } from './services/observables/TestObservableServiceNoInterceptor';
import { TestObservableServiceInterceptors } from './services/observables/TestObservableServiceInterceptors';
import { TestPromiseServiceInterceptors } from './services/promises/TestPromiseServiceInterceptors';
import { TestPromiseServiceInterceptor } from './services/promises/TestPromiseServiceInterceptor';
import { TestInterceptorRequest, TestInterceptorResponse } from './services/interceptors/test.interceptor';

import testData from './mockServer/data/testData.json';

describe('Testing Interceptors in MethodsService', () => {
  const errorFunc = (error: AxiosError<any>, done: any) => {
    expect(error).toBeNull();
    done.fail();
  };

  describe('ADDING INTERCEPTORS', () => {
    it('adding the Interceptor', done => {
      const interceptorRequest = new TestInterceptorRequest();
      const interceptorResponse = new TestInterceptorResponse();
      const methodsService = new Axiosfit<TestObservableServiceNoInterceptor>()
        .baseUrl(process.env.MOCK_SERVER_URL)
        .addInterceptor(interceptorRequest)
        .addInterceptor(interceptorResponse)
        .create(TestObservableServiceNoInterceptor);

      methodsService.performGetRequestAddingReqInterceptor().subscribe(
        (response: AxiosResponse<string>) => {
          expect(response.data).toHaveProperty('headers.authorization', 'Bearer token');
          done();
        },
        (error: AxiosError<any>) => errorFunc(error, done),
      );

      methodsService.performGetRequestAddingResInterceptor().subscribe(
        (response: AxiosResponse<string>) => {
          expect(response.data).toEqual({ ...testData.GET.performGetRequestAddingResInterceptor.check, newData: 'new' });
          done();
        },
        (error: AxiosError<any>) => errorFunc(error, done),
      );
    });
  });

  describe('REQUEST INTERCEPTORS', () => {
    it('without parameters using Observables and the Interceptor', done => {
      const methodsService = new Axiosfit<TestObservableServiceInterceptor>()
        .baseUrl(process.env.MOCK_SERVER_URL)
        .create(TestObservableServiceInterceptor);

      methodsService.performGetRequestAddingReqInterceptor().subscribe(
        (response: AxiosResponse<string>) => {
          expect(response.data).toHaveProperty('headers.authorization', 'Bearer token');
          done();
        },
        (error: AxiosError<any>) => errorFunc(error, done),
      );
    });

    it('without parameters using Observables and the Interceptors', done => {
      const methodsService = new Axiosfit<TestObservableServiceInterceptors>()
        .baseUrl(process.env.MOCK_SERVER_URL)
        .create(TestObservableServiceInterceptors);

      methodsService.performGetRequestAddingReqInterceptor().subscribe(
        (response: AxiosResponse<string>) => {
          expect(response.data).toHaveProperty('headers.authorization', 'Bearer token');
          done();
        },
        (error: AxiosError<any>) => errorFunc(error, done),
      );
    });

    describe('Using Promises and the Interceptor', () => {
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
          .catch((error: AxiosError<any>) => errorFunc(error, done));
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

    describe('Using Promises and the Interceptors', () => {
      const methodsService = new Axiosfit<TestPromiseServiceInterceptors>()
        .baseUrl(process.env.MOCK_SERVER_URL)
        .create(TestPromiseServiceInterceptors);

      it('not parameters, not async', done => {
        methodsService
          .performGetRequestAddingReqInterceptor()
          .then((response: AxiosResponse<string>) => {
            expect(response.data).toHaveProperty('headers.authorization', 'Bearer token');
            done();
          })
          .catch((error: AxiosError<any>) => errorFunc(error, done));
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
    it('without parameters using Observables and the Interceptor', done => {
      const methodsService = new Axiosfit<TestObservableServiceInterceptor>()
        .baseUrl(process.env.MOCK_SERVER_URL)
        .create(TestObservableServiceInterceptor);

      methodsService.performGetRequestAddingResInterceptor().subscribe(
        (response: AxiosResponse<string>) => {
          expect(response.data).toEqual({ ...testData.GET.performGetRequestAddingResInterceptor.check, newData: 'new' });
          done();
        },
        (error: AxiosError<any>) => errorFunc(error, done),
      );
    });

    it('without parameters using Observables and the Interceptors', done => {
      const methodsService = new Axiosfit<TestObservableServiceInterceptors>()
        .baseUrl(process.env.MOCK_SERVER_URL)
        .create(TestObservableServiceInterceptors);

      methodsService.performGetRequestAddingResInterceptor().subscribe(
        (response: AxiosResponse<string>) => {
          expect(response.data).toEqual({ ...testData.GET.performGetRequestAddingResInterceptor.check, newData: 'new' });
          done();
        },
        (error: AxiosError<any>) => errorFunc(error, done),
      );
    });

    describe('Using Promises and the Interceptor', () => {
      const methodsService = new Axiosfit<TestPromiseServiceInterceptor>()
        .baseUrl(process.env.MOCK_SERVER_URL)
        .create(TestPromiseServiceInterceptor);

      it('not parameters, not async', done => {
        methodsService
          .performGetRequestAddingResInterceptor()
          .then((response: AxiosResponse<string>) => {
            expect(response.data).toEqual({ ...testData.GET.performGetRequestAddingResInterceptor.check, newData: 'new' });
            done();
          })
          .catch((error: AxiosError<any>) => errorFunc(error, done));
      });

      it('not parameters, with async', async () => {
        try {
          const axiosResponse = await methodsService.performGetRequestAddingResInterceptor();
          expect(axiosResponse.data).toEqual({ ...testData.GET.performGetRequestAddingResInterceptor.check, newData: 'new' });
        } catch (error) {
          expect(error).toBeNull();
        }
      });
    });

    describe('Using Promises and the Interceptors', () => {
      const methodsService = new Axiosfit<TestPromiseServiceInterceptors>()
        .baseUrl(process.env.MOCK_SERVER_URL)
        .create(TestPromiseServiceInterceptors);

      it('not parameters, not async', done => {
        methodsService
          .performGetRequestAddingResInterceptor()
          .then((response: AxiosResponse<string>) => {
            expect(response.data).toEqual({ ...testData.GET.performGetRequestAddingResInterceptor.check, newData: 'new' });
            done();
          })
          .catch((error: AxiosError<any>) => errorFunc(error, done));
      });

      it('not parameters, with async', async () => {
        try {
          const axiosResponse = await methodsService.performGetRequestAddingResInterceptor();
          expect(axiosResponse.data).toEqual({ ...testData.GET.performGetRequestAddingResInterceptor.check, newData: 'new' });
        } catch (error) {
          expect(error).toBeNull();
        }
      });
    });
  });
});
