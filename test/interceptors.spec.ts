import { Axiosfit, AxiosResponse, AxiosError, AxiosfitInterceptor, AxiosfitInterceptorRequest, AxiosRequestConfig } from '../src';

import { MethodsService } from './services/MethodsService';

describe('MethodsService', () => {
  describe('REQUEST INTERCEPTORS', () => {
    it('without parameters', done => {
      const interceptor: AxiosfitInterceptor = {
        request: {
          onFulFilled: (config: AxiosRequestConfig): AxiosRequestConfig => {
            // tslint:disable-next-line: no-string-literal
            config.headers['authorization'] = 'Bearer token';
            return config;
          },
        },
      };

      const methodsService = new Axiosfit<MethodsService>()
        .baseUrl(process.env.MOCK_SERVER_URL)
        .addInterceptor(interceptor)
        .create(MethodsService);

      const errorFunc = (error: AxiosError<any>) => {
        expect(error).toBeNull();
        done.fail();
      };

      methodsService.getDemoAddingReqInterceptor().subscribe((response: AxiosResponse<string>) => {
        expect(response.data).toHaveProperty('headers.authorization', 'Bearer token');
        done();
      }, errorFunc);
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

      const methodsService = new Axiosfit<MethodsService>()
        .baseUrl(process.env.MOCK_SERVER_URL)
        .addInterceptor(interceptor)
        .create(MethodsService);

      const errorFunc = (error: AxiosError<any>) => {
        expect(error).toBeNull();
        done.fail();
      };

      methodsService.getDemoAddingResInterceptor().subscribe((response: AxiosResponse<string>) => {
        expect(response.data).toEqual({ data: 'noParameters_ResponseInterceptor', newData: 'new' });
        done();
      }, errorFunc);
    });
  });
});
