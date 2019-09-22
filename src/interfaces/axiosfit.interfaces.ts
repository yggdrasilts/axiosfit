import { AxiosInstance, AxiosRequestConfig } from 'axios';

import { AxiosfitInterceptor } from './interceptors/axiosfit.interceptor.interface';
import { ISegment } from './segment.interfaces';

/**
 * Interface to match the Axiosfit service.
 */
export interface IAxiosfit {
  baseEndpoint: string;

  instance: AxiosInstance;
  config: AxiosRequestConfig;

  setBaseServiceEndpoint(baseServiceEndpoint: string);
  setConfig(config: AxiosRequestConfig);
  setInterceptors(interceptors: AxiosfitInterceptor[]);

  addUrl(key: string, url: any): void;
  getUrl(key: string): any;

  addSegment(key: string, segment: ISegment): void;
  getSegments(key: string): Map<number, string>;

  setData(key: string, parameterIndex: number): void;
  getData(key: string): number;
}
