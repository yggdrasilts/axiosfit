import { AxiosRequestConfig } from 'axios';

import { serviceMap } from './decorators/Utilities';
import { AxiosfitInterceptor } from './interfaces/Interfaces';

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
    this.interceptors.push(interceptor);
    return this;
  }

  create<T>(type: new () => T): S {
    const service = new type();
    serviceMap[service.constructor.name].setConfig(this.config);
    serviceMap[service.constructor.name].setInterceptors(this.interceptors);
    this.service = (serviceMap[service.constructor.name] as unknown) as S;
    return this.service;
  }
}
