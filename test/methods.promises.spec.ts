import { Axiosfit, AxiosResponse, AxiosError } from '../src';

import { TestPromiseServiceNoBase } from './services/TestPromiseServicesNoBase';
import { TestPromiseService } from './services/TestPromiseService';

import testData from './mockServer/data/testData.json';

describe('Testing Methods using Promise responses', () => {
  const okFunc = (response: string, check: string, done: any) => {
    expect(response).toBe(check);
    done();
  };
  const errorFunc = (error: AxiosError<any>, done: any) => {
    expect(error).toBeNull();
    done.fail(error);
  };

  describe('TestServiceNoBase', () => {
    const testServiceNoBase = new Axiosfit<TestPromiseServiceNoBase>()
      .baseUrl(process.env.MOCK_SERVER_URL)
      .create(TestPromiseServiceNoBase);

    describe('GET methods', () => {
      it('without parameters', done => {
        testServiceNoBase
          .performGetRequest()
          .then(axiosResponse => {
            okFunc(axiosResponse.data, testData.GET.performGetRequest.check, done);
          })
          .catch(error => errorFunc(error, done));
      });

      it('without parameters and getting an error', done => {
        testServiceNoBase
          .performGetRequestWithError()
          .then(axiosResponse => {
            done.fail();
          })
          .catch((error: AxiosError<any>) => {
            expect(error).not.toBeNull();
            done();
          });
      });
    });
  });

  describe('TestService', () => {
    const testService = new Axiosfit<TestPromiseService>().baseUrl(process.env.MOCK_SERVER_URL).create(TestPromiseService);

    describe('GET methods', () => {
      it('without parameters', done => {
        testService
          .performGetRequest()
          .then((response: AxiosResponse<string>) => {
            okFunc(response.data, testData.GET.performGetRequest.check, done);
          })
          .catch(error => errorFunc(error, done));
      });

      it('with only one parameter', done => {
        testService
          .performGetRequestUsingAPathVariable('param1')
          .then((response: AxiosResponse<string>) => {
            okFunc(response.data, testData.GET.performGetRequestUsingAPathVariable.check, done);
          })
          .catch(error => errorFunc(error, done));
      });

      it('with some parameters', done => {
        testService
          .performGetRequestUsingPathVariables('param1', 'param2')
          .then((response: AxiosResponse<string>) => {
            okFunc(response.data, testData.GET.performGetRequestUsingPathVariables.check, done);
          })
          .catch(error => errorFunc(error, done));
      });
    });

    describe('DELETE methods', () => {
      it('without parameters', done => {
        testService
          .performDeleteRequest()
          .then((response: AxiosResponse<string>) => {
            okFunc(response.data, testData.DELETE.performDeleteRequest.check, done);
          })
          .catch(error => errorFunc(error, done));
      });
    });

    describe('POST methods', () => {
      it('without parameters', done => {
        testService
          .performPostRequest({ data: 'data' })
          .then((response: AxiosResponse<string>) => {
            expect(response.data).toEqual(testData.POST.performPostRequest.check);
            done();
          })
          .catch(error => errorFunc(error, done));
      });
    });

    describe('PUT methods', () => {
      it('without parameters', done => {
        testService
          .performPutRequest({ data: 'data' })
          .then((response: AxiosResponse<string>) => {
            expect(response.data).toEqual(testData.PUT.performPutRequest.check);
            done();
          })
          .catch(error => errorFunc(error, done));
      });
    });

    describe('PATCH methods', () => {
      it('without parameters', done => {
        testService
          .performPatchRequest({ data: 'data' })
          .then((response: AxiosResponse<string>) => {
            expect(response.data).toEqual(testData.PATCH.performPatchRequest.check);
            done();
          })
          .catch(error => errorFunc(error, done));
      });
    });
  });
});
