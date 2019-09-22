import { AxiosRequestConfig } from 'axios';

import { AxiosfitInterceptor } from './interfaces';
import { serviceMap } from './decorators/utilities';

/**
 * Class to create the Axiosfit service to be used.
 *
 * @export
 * @class Axiosfit
 * @template S Service template with the configurations to request the API.
 */
export class Axiosfit<S> {
  private service: S;
  private config: AxiosRequestConfig = {};
  private interceptors: AxiosfitInterceptor[] = [];

  /**
   * Base url to be used by Axiosfit service.
   *
   * @param {string} baseUrl The base url.
   * @returns {Axiosfit<S>} The service.
   * @memberof Axiosfit
   */
  baseUrl(baseUrl: string): Axiosfit<S> {
    this.config.baseURL = baseUrl;
    return this;
  }

  /**
   * Add an axios interceptor.
   *
   * @param {AxiosfitInterceptor} interceptor Function that match with AxiosfitInterceptor interface.
   * @returns {Axiosfit<S>} The service.
   * @memberof Axiosfit
   */
  addInterceptor(interceptor: AxiosfitInterceptor): Axiosfit<S> {
    this.interceptors.push(interceptor);
    return this;
  }

  /**
   * Creates the Axiosfit service.
   *
   * @template T
   * @param {new () => T} type Axiosfit configuration class.
   * @returns {S} The service.
   * @memberof Axiosfit
   */
  create<T>(type: new () => T): S {
    const service = new type();
    serviceMap[service.constructor.name].setConfig(this.config);
    serviceMap[service.constructor.name].setInterceptors(this.interceptors);
    this.service = (serviceMap[service.constructor.name] as unknown) as S;
    return this.service;
  }
}
