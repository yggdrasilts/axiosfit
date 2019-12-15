import { AxiosfitRequestInterceptor, AxiosfitResponseInterceptor } from 'src/interfaces';
import { AxiosRequestConfig, AxiosResponse } from 'src';

// tslint:disable-next-line: max-classes-per-file
export class TestInterceptor implements AxiosfitRequestInterceptor, AxiosfitResponseInterceptor {
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

// tslint:disable-next-line: max-classes-per-file
export class TestInterceptorRequest implements AxiosfitRequestInterceptor {
  onRequest(config: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig> {
    // tslint:disable-next-line: no-string-literal
    config.headers['authorization'] = 'Bearer token';
    return config;
  }
}

// tslint:disable-next-line: max-classes-per-file
export class TestInterceptorResponse implements AxiosfitResponseInterceptor {
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
