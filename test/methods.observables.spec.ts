import { Axiosfit, AxiosResponse, AxiosError } from '../src';

import { TestObservableService } from './services/TestObservableService';
import { TestObservableServiceNoBase } from './services/TestObservableServicesNoBase';

import testData from './mockServer/data/testData.json';

describe('Testing Methods using Observable responses', () => {
  const okFunc = (response: string, check: string, done: any) => {
    expect(response).toBe(check);
    done();
  };

  const errorFunc = (error: AxiosError<any>, done: any) => {
    expect(error).toBeNull();
    done.fail();
  };

  describe('TestServiceNoBase', () => {
    const TestServiceNoBase = new Axiosfit<TestObservableServiceNoBase>()
      .baseUrl(process.env.MOCK_SERVER_URL)
      .create(TestObservableServiceNoBase);

    describe('GET methods', () => {
      it('without parameters', done => {
        TestServiceNoBase.performGetRequest().subscribe(
          (response: AxiosResponse<string>) => {
            okFunc(response.data, testData.GET.performGetRequest.check, done);
          },
          error => errorFunc(error, done),
        );
      });

      it('without parameters and getting an error', done => {
        TestServiceNoBase.performGetRequestWithError().subscribe(
          axiosResponse => done.fail(),
          error => {
            expect(error).not.toBeNull();
            done();
          },
        );
      });
    });
  });

  describe('MethodsService', () => {
    const methodsService = new Axiosfit<TestObservableService>().baseUrl(process.env.MOCK_SERVER_URL).create(TestObservableService);

    describe('GET methods', () => {
      it('without parameters', done => {
        methodsService.performGetRequest().subscribe(
          (response: AxiosResponse<string>) => {
            okFunc(response.data, testData.GET.performGetRequest.check, done);
          },
          error => errorFunc(error, done),
        );
      });

      it('with only one parameter', done => {
        methodsService.performGetRequestUsingAPathVariable('param1').subscribe(
          (response: AxiosResponse<string>) => {
            okFunc(response.data, testData.GET.performGetRequestUsingAPathVariable.check, done);
          },
          error => errorFunc(error, done),
        );
      });

      it('with some parameters', done => {
        methodsService.performGetRequestUsingPathVariables('param1', 'param2').subscribe(
          (response: AxiosResponse<string>) => {
            okFunc(response.data, testData.GET.performGetRequestUsingPathVariables.check, done);
          },
          error => errorFunc(error, done),
        );
      });
    });

    describe('DELETE methods', () => {
      it('without parameters', done => {
        methodsService.performDeleteRequest().subscribe(
          (response: AxiosResponse<string>) => {
            okFunc(response.data, testData.DELETE.performDeleteRequest.check, done);
          },
          error => errorFunc(error, done),
        );
      });
    });

    describe('POST methods', () => {
      it('without parameters', done => {
        methodsService.performPostRequest({ data: 'data' }).subscribe(
          (response: AxiosResponse<string>) => {
            expect(response.data).toEqual(testData.POST.performPostRequest.check);
            done();
          },
          error => errorFunc(error, done),
        );
      });
    });

    describe('PUT methods', () => {
      it('without parameters', done => {
        methodsService.performPutRequest({ data: 'data' }).subscribe(
          (response: AxiosResponse<string>) => {
            expect(response.data).toEqual(testData.PUT.performPutRequest.check);
            done();
          },
          error => errorFunc(error, done),
        );
      });
    });

    describe('PATCH methods', () => {
      it('without parameters', done => {
        methodsService.performPatchRequest({ data: 'data' }).subscribe(
          (response: AxiosResponse<string>) => {
            expect(response.data).toEqual(testData.PATCH.performPatchRequest.check);
            done();
          },
          error => errorFunc(error, done),
        );
      });
    });
  });
});
