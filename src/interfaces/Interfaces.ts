import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * Interface to match segments for sending requests.
 */
export interface ISegment {
  name: string;
  index: number;
}

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

/**
 * Interface to match an axios interceptor.
 */
export interface AxiosfitInterceptor {
  request?: AxiosfitInterceptorRequest;
  response?: AxiosfitInterceptorResponse;
}

/**
 * Interface to match the request for an axios interceptor.
 */
export interface AxiosfitInterceptorRequest {
  onFulFilled?: (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
  onRejected?: (error: any) => any;
}

/**
 * Interface to match the response for an axios interceptor.
 */
export interface AxiosfitInterceptorResponse {
  onFulFilled?: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
  onRejected?: (error: any) => any;
}
