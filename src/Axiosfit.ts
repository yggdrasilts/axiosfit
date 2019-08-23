import { AxiosRequestConfig } from 'axios';

import { serviceMap } from './decorators/Utilities';

export class Axiosfit<S> {
  private service: S;
  private config: AxiosRequestConfig = {};

  baseUrl(baseUrl: string): Axiosfit<S> {
    this.config.baseURL = baseUrl;
    return this;
  }

  create<T>(type: new () => T): S {
    const service = new type();
    serviceMap[service.constructor.name].setConfig(this.config);
    this.service = (serviceMap[service.constructor.name] as unknown) as S;
    return this.service;
  }
}
