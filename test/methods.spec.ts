import { Axiosfit, AxiosResponse, AxiosError } from '../src';

import { MethodsService } from './services/MethodsService';
import { MethodsServiceNoBase } from './services/MethodsServiceNoBase';

import testData from './mockServer/testData.json';

describe('TEST Methods', () => {
  describe('MethodsServiceNoBase', () => {
    const methodsServiceNoBase = new Axiosfit<MethodsServiceNoBase>().baseUrl(process.env.MOCK_SERVER_URL).create(MethodsServiceNoBase);

    describe('GET methods', () => {
      it('without parameters', done => {
        const okFunc = (response: string, check: string) => {
          expect(response).toBe(check);
          done();
        };
        const errorFunc = (error: AxiosError<any>) => {
          expect(error).toBeNull();
          done.fail();
        };

        methodsServiceNoBase.performGetRequest().subscribe((response: AxiosResponse<string>) => {
          okFunc(response.data, testData.GET.performGetRequest.check);
        }, errorFunc);
      });
    });
  });

  describe('MethodsService', () => {
    const methodsService = new Axiosfit<MethodsService>().baseUrl(process.env.MOCK_SERVER_URL).create(MethodsService);

    describe('GET methods', () => {
      it('without parameters', done => {
        const okFunc = (response: string, check: string) => {
          expect(response).toBe(check);
          done();
        };
        const errorFunc = (error: AxiosError<any>) => {
          expect(error).toBeNull();
          done.fail();
        };

        methodsService.performGetRequest().subscribe((response: AxiosResponse<string>) => {
          okFunc(response.data, testData.GET.performGetRequest.check);
        }, errorFunc);
      });

      it('with only one parameter', done => {
        const okFunc = (response: string, check: string) => {
          expect(response).toBe(check);
          done();
        };
        const errorFunc = (error: AxiosError<any>) => {
          expect(error).toBeNull();
          done.fail();
        };

        methodsService.performGetRequestUsingAPathVariable('param1').subscribe((response: AxiosResponse<string>) => {
          okFunc(response.data, testData.GET.performGetRequestUsingAPathVariable.check);
        }, errorFunc);
      });

      it('with some parameters', done => {
        const okFunc = (response: string, check: string) => {
          expect(response).toBe(check);
          done();
        };
        const errorFunc = (error: AxiosError<any>) => {
          expect(error).toBeNull();
          done.fail();
        };

        methodsService.performGetRequestUsingPathVariables('param1', 'param2').subscribe((response: AxiosResponse<string>) => {
          okFunc(response.data, testData.GET.performGetRequestUsingPathVariables.check);
        }, errorFunc);
      });
    });

    describe('DELETE methods', () => {
      it('without parameters', done => {
        const okFunc = (response: string, check: string) => {
          expect(response).toBe(check);
          done();
        };
        const errorFunc = (error: AxiosError<any>) => {
          expect(error).toBeNull();
          done.fail();
        };

        methodsService.performDeleteRequest().subscribe((response: AxiosResponse<string>) => {
          okFunc(response.data, testData.DELETE.performDeleteRequest.check);
        }, errorFunc);
      });
    });

    describe('POST methods', () => {
      it('without parameters', done => {
        const errorFunc = (error: AxiosError<any>) => {
          expect(error).toBeNull();
          done.fail();
        };

        methodsService.performPostRequest({ data: 'data' }).subscribe((response: AxiosResponse<string>) => {
          expect(response.data).toEqual(testData.POST.performPostRequest.check);
          done();
        }, errorFunc);
      });
    });

    describe('PUT methods', () => {
      it('without parameters', done => {
        const errorFunc = (error: AxiosError<any>) => {
          expect(error).toBeNull();
          done.fail();
        };

        methodsService.performPutRequest({ data: 'data' }).subscribe((response: AxiosResponse<string>) => {
          expect(response.data).toEqual(testData.PUT.performPutRequest.check);
          done();
        }, errorFunc);
      });
    });

    describe('PATCH methods', () => {
      it('without parameters', done => {
        const errorFunc = (error: AxiosError<any>) => {
          expect(error).toBeNull();
          done.fail();
        };

        methodsService.performPatchRequest({ data: 'data' }).subscribe((response: AxiosResponse<string>) => {
          expect(response.data).toEqual(testData.PATCH.performPatchRequest.check);
          done();
        }, errorFunc);
      });
    });
  });
});
