import { AxiosInstance, AxiosRequestConfig } from 'axios';

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

  addUrl(key: string, url: any): void;
  getUrl(key: string): any;

  addSegment(key: string, segment: ISegment): void;
  getSegments(key: string): Map<number, string>;
}
