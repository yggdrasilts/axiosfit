import { AxiosInstance, AxiosRequestConfig } from 'axios';

import { AxiosfitInterceptor } from './interceptors/axiosfit.interceptor.interface';
import { ISegment } from './segment.interface';
import { IParam } from './param.interface';

/**
 * Interface to match the Axiosfit service.
 */
export interface IAxiosfit {
  baseEndpoint: string;

  instance: AxiosInstance;
  axiosConfig: AxiosRequestConfig;
  AxiosfitConfig: AxiosfitConfig;

  setAxiosfitConfig(axiosfitConfig: AxiosfitConfig);

  setBaseServiceEndpoint(baseServiceEndpoint: string);
  setGlobalInterceptors(globalInterceptors: AxiosfitInterceptor[]);
  setConfig(config: AxiosRequestConfig);
  setInterceptors(interceptors: AxiosfitInterceptor[]);

  addUrl(key: string, url: any): void;
  getUrl(key: string): any;

  addSegment(key: string, segment: ISegment): void;
  getSegments(key: string): Map<number, string>;

  addParameter(key: string, param: IParam): void;
  getParameters(key: string): Map<number, string>;

  setParameters(parametersMap: Map<string, string>);

  // TODO: Use with the method decorator for headers.
  // addHeaders(headers: string | { [key: string]: string });
  addHeadersMap(key: string, param: IParam): void;
  getHeadersMap(key: string): Map<number, string>;

  setData(key: string, parameterIndex: number): void;
  getData(key: string): number;
}

export interface AxiosfitConfig {
  usePromises?: boolean;
  enableAxiosLogger?: boolean;
}
