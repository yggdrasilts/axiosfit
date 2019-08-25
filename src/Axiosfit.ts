import { AxiosRequestConfig, AxiosInterceptorManager, AxiosResponse } from 'axios';

import { serviceMap } from './decorators/Utilities';

interface AxiosfitInterceptorRequest {
  onFulFilled?: (value: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
  onRejected?: (error: any) => any;
}

interface AxiosfitInterceptorResponse {
  onFulFilled?: (value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
  onRejected?: (error: any) => any;
}

interface AxiosfitInterceptor {
  request?: AxiosfitInterceptorRequest;
  response?: AxiosfitInterceptorResponse;
}

// tslint:disable-next-line: max-classes-per-file
export class Axiosfit<S> {
  private service: S;
  private config: AxiosRequestConfig = {};
  private interceptors: AxiosfitInterceptor[] = [];

  baseUrl(baseUrl: string): Axiosfit<S> {
    this.config.baseURL = baseUrl;
    return this;
  }

  addInterceptor(interceptor: AxiosfitInterceptor): Axiosfit<S> {
    if (interceptor && !interceptor.request && !interceptor.response) {
      return this;
    }
    this.interceptors.push(interceptor);
    return this;
  }

  create<T>(type: new () => T): S {
    const service = new type();
    serviceMap[service.constructor.name].setConfig(this.config);
    this.service = (serviceMap[service.constructor.name] as unknown) as S;
    return this.service;
  }
}
