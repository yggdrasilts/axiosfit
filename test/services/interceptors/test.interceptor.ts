import { AxiosfitInterceptor, AxiosfitInterceptorRequest, AxiosfitInterceptorResponse } from 'src/interfaces';
import { AxiosRequestConfig, AxiosResponse } from 'src';

export class TestInterceptor implements AxiosfitInterceptor {
  request?: AxiosfitInterceptorRequest;
  response?: AxiosfitInterceptorResponse;

  constructor() {
    this.request = {
      onFulFilled: (config: AxiosRequestConfig): AxiosRequestConfig => {
        // tslint:disable-next-line: no-string-literal
        config.headers['authorization'] = 'Bearer token';
        return config;
      },
    };

    this.response = {
      onFulFilled: (response: AxiosResponse): AxiosResponse => {
        // tslint:disable-next-line: no-string-literal
        const currentData = response.data;
        response.data = {
          ...currentData,
          newData: 'new',
        };
        return response;
      },
    };
  }
}
