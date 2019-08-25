import { Axiosfit, AxiosResponse, AxiosError } from '../src';

import { MethodsService } from './services/MethodsService';

describe('MethodsService', () => {
  const methodsService = new Axiosfit<MethodsService>().baseUrl(process.env.MOCK_SERVER_URL).create(MethodsService);

  describe('GET methods', () => {
    it('without parameters', done => {
      const okFunc = (response: AxiosResponse<string>, check: string) => {
        expect(response.data).toBe(check);
        done();
      };
      const errorFunc = (error: AxiosError<any>) => {
        expect(error).toBeNull();
        done.fail();
      };

      methodsService.getDemo().subscribe((response: AxiosResponse<string>) => {
        okFunc(response, 'noParameters');
      }, errorFunc);
    });

    it('with only one parameter', done => {
      const okFunc = (response: AxiosResponse<string>, check: string) => {
        expect(response.data).toBe(check);
        done();
      };
      const errorFunc = (error: AxiosError<any>) => {
        expect(error).toBeNull();
        done.fail();
      };

      methodsService.getWithParam('param1').subscribe((response: AxiosResponse<string>) => {
        okFunc(response, 'with param: param1');
      }, errorFunc);
    });

    it('with some parameters', done => {
      const okFunc = (response: AxiosResponse<string>, check: string) => {
        expect(response.data).toBe(check);
        done();
      };
      const errorFunc = (error: AxiosError<any>) => {
        expect(error).toBeNull();
        done.fail();
      };

      methodsService.getWithParams('param1', 'param2').subscribe((response: AxiosResponse<string>) => {
        okFunc(response, 'with params: param1, param2');
      }, errorFunc);
    });
  });
});
