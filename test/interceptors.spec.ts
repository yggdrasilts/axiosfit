import { Axiosfit, AxiosResponse, AxiosError } from '../src';

import { TestObservableServiceInterceptor } from './services/observables/TestObservableServiceInterceptor';
import { TestObservableServiceNewInterceptor } from './services/observables/TestObservableServiceNewInterceptor';
import { TestPromiseServiceInterceptor } from './services/promises/TestPromiseServiceInterceptor';
import { TestPromiseServiceNewInterceptor } from './services/promises/TestPromiseServiceNewInterceptor';

import testData from './mockServer/data/testData.json';

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

    it('without parameters using Observables and the NewInterceptor', done => {
      const methodsService = new Axiosfit<TestObservableServiceNewInterceptor>()
        .baseUrl(process.env.MOCK_SERVER_URL)
        .create(TestObservableServiceNewInterceptor);

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

    describe('Using Promises and the NewInterceptor', () => {
      const methodsService = new Axiosfit<TestPromiseServiceNewInterceptor>()
        .baseUrl(process.env.MOCK_SERVER_URL)
        .create(TestPromiseServiceNewInterceptor);

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
    it('without parameters using Observables', done => {
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

    it('without parameters using Observables and the NewInterceptor', done => {
      const methodsService = new Axiosfit<TestObservableServiceNewInterceptor>()
        .baseUrl(process.env.MOCK_SERVER_URL)
        .create(TestObservableServiceNewInterceptor);

      methodsService.performGetRequestAddingResInterceptor().subscribe(
        (response: AxiosResponse<string>) => {
          expect(response.data).toEqual({ ...testData.GET.performGetRequestAddingResInterceptor.check, newData: 'new' });
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
          .performGetRequestAddingResInterceptor()
          .then((response: AxiosResponse<string>) => {
            expect(response.data).toEqual({ ...testData.GET.performGetRequestAddingResInterceptor.check, newData: 'new' });
            done();
          })
          .catch(error => errorFunc(error, done));
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

    describe('Using Promises and the NewInterceptor', () => {
      const methodsService = new Axiosfit<TestPromiseServiceNewInterceptor>()
        .baseUrl(process.env.MOCK_SERVER_URL)
        .create(TestPromiseServiceNewInterceptor);

      it('not parameters, not async', done => {
        methodsService
          .performGetRequestAddingResInterceptor()
          .then((response: AxiosResponse<string>) => {
            expect(response.data).toEqual({ ...testData.GET.performGetRequestAddingResInterceptor.check, newData: 'new' });
            done();
          })
          .catch(error => errorFunc(error, done));
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
