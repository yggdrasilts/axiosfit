import { Axiosfit, AxiosResponse, AxiosError } from '../src';

import { TestObservableService } from './services/observables/TestObservableService';
import { TestObservableServiceNoBase } from './services/observables/TestObservableServicesNoBase';

import testData from './mockServer/data/testData.json';

describe('Testing Methods using Observable responses', () => {
  const okFunc = (response: any, check: any, done: any) => {
    expect(JSON.stringify(response)).toBe(JSON.stringify(check));
    done();
  };

  const errorFunc = (error: AxiosError<any>, done: any) => {
    expect(error).toBeNull();
    done.fail();
  };

  describe('TestServiceNoBase', () => {
    const testServiceNoBase = new Axiosfit<TestObservableServiceNoBase>()
      .baseUrl(process.env.MOCK_SERVER_URL)
      .create(TestObservableServiceNoBase);

    describe('GET methods', () => {
      it('without parameters', done => {
        testServiceNoBase.performGetRequest().subscribe(
          (response: AxiosResponse<string>) => {
            okFunc(response.data, testData.GET.performGetRequest.check, done);
          },
          (error: AxiosError<any>) => errorFunc(error, done),
        );
      });

      it('without parameters and getting an error', done => {
        testServiceNoBase.performGetRequestWithError().subscribe(
          (response: AxiosResponse<any>) => done.fail(),
          (error: AxiosError<any>) => {
            expect(error).not.toBeNull();
            done();
          },
        );
      });
    });
  });

  describe('TestObservableService', () => {
    const testObservableService = new Axiosfit<TestObservableService>().baseUrl(process.env.MOCK_SERVER_URL).create(TestObservableService);

    describe('GET methods', () => {
      it('without parameters', done => {
        testObservableService.performGetRequest().subscribe(
          (response: AxiosResponse<string>) => {
            okFunc(response.data, testData.GET.performGetRequest.check, done);
          },
          (error: AxiosError<any>) => errorFunc(error, done),
        );
      });

      it('with parameter', done => {
        testObservableService.performGetRequestWithParameter('identifier').subscribe(
          (response: AxiosResponse<string>) => {
            okFunc(response.data, { id: 'identifier' }, done);
          },
          (error: AxiosError<any>) => errorFunc(error, done),
        );
      });

      it('with parameterMap', done => {
        testObservableService.performGetRequestWithParametersMap({ query: 'common' }).subscribe(
          (response: AxiosResponse<string>) => {
            okFunc(response.data, { query: 'common' }, done);
          },
          (error: AxiosError<any>) => errorFunc(error, done),
        );
      });

      it('with a parameter and parameterMap', done => {
        testObservableService.performGetRequestWithParameters('identifier1', 'identifier2', { query: 'common' }).subscribe(
          (response: AxiosResponse<string>) => {
            expect(Object.keys(response.data).length).toEqual(3);
            expect((response.data as any).id1).not.toBeUndefined();
            expect((response.data as any).id1).toEqual('identifier1');
            expect((response.data as any).id2).not.toBeUndefined();
            expect((response.data as any).id2).toEqual('identifier2');
            expect((response.data as any).query).not.toBeUndefined();
            expect((response.data as any).query).toEqual('common');
            done();
          },
          (error: AxiosError<any>) => errorFunc(error, done),
        );
      });

      it('with only one path parameter', done => {
        testObservableService.performGetRequestUsingAPathVariable('param1').subscribe(
          (response: AxiosResponse<string>) => {
            okFunc(response.data, testData.GET.performGetRequestUsingAPathVariable.check, done);
          },
          (error: AxiosError<any>) => errorFunc(error, done),
        );
      });

      it('with some path parameters', done => {
        testObservableService.performGetRequestUsingPathVariables('param1', 'param2').subscribe(
          (response: AxiosResponse<string>) => {
            okFunc(response.data, testData.GET.performGetRequestUsingPathVariables.check, done);
          },
          (error: AxiosError<any>) => errorFunc(error, done),
        );
      });
    });

    describe('DELETE methods', () => {
      it('without parameters', done => {
        testObservableService.performDeleteRequest().subscribe(
          (response: AxiosResponse<string>) => {
            okFunc(response.data, testData.DELETE.performDeleteRequest.check, done);
          },
          (error: AxiosError<any>) => errorFunc(error, done),
        );
      });
    });

    describe('POST methods', () => {
      it('without parameters', done => {
        testObservableService.performPostRequest({ data: 'data' }).subscribe(
          (response: AxiosResponse<string>) => {
            expect(response.data).toEqual(testData.POST.performPostRequest.check);
            done();
          },
          (error: AxiosError<any>) => errorFunc(error, done),
        );
      });
    });

    describe('PUT methods', () => {
      it('without parameters', done => {
        testObservableService.performPutRequest({ data: 'data' }).subscribe(
          (response: AxiosResponse<string>) => {
            expect(response.data).toEqual(testData.PUT.performPutRequest.check);
            done();
          },
          (error: AxiosError<any>) => errorFunc(error, done),
        );
      });
    });

    describe('PATCH methods', () => {
      it('without parameters', done => {
        testObservableService.performPatchRequest({ data: 'data' }).subscribe(
          (response: AxiosResponse<string>) => {
            expect(response.data).toEqual(testData.PATCH.performPatchRequest.check);
            done();
          },
          (error: AxiosError<any>) => errorFunc(error, done),
        );
      });
    });
  });
});
