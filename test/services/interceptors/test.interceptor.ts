import {
  AxiosfitInterceptor,
  AxiosfitInterceptorRequest,
  AxiosfitInterceptorResponse,
  AxiosfitRequestInterceptor,
  AxiosfitResponseInterceptor,
} from 'src/interfaces';
import { AxiosRequestConfig, AxiosResponse } from 'src';

// REMOVE: Remove in version 0.6.0
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

// tslint:disable-next-line: max-classes-per-file
export class TestNewInterceptor implements AxiosfitRequestInterceptor, AxiosfitResponseInterceptor {
  onRequest(config: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig> {
    // tslint:disable-next-line: no-string-literal
    config.headers['authorization'] = 'Bearer token';
    return config;
  }

  onResponse(response: AxiosResponse<any>): AxiosResponse<any> | Promise<AxiosResponse<any>> {
    // tslint:disable-next-line: no-string-literal
    const currentData = response.data;
    response.data = {
      ...currentData,
      newData: 'new',
    };
    return response;
  }
}
