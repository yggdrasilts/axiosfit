import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface ISegment {
  name: string;
  index: number;
}

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
}

export interface AxiosfitInterceptor {
  request?: AxiosfitInterceptorRequest;
  response?: AxiosfitInterceptorResponse;
}

export interface AxiosfitInterceptorRequest {
  onFulFilled?: (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
  onRejected?: (error: any) => any;
}

export interface AxiosfitInterceptorResponse {
  onFulFilled?: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
  onRejected?: (error: any) => any;
}
