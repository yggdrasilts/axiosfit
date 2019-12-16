import { AxiosRequestConfig } from 'axios';
import { AxiosfitInterceptor } from './axiosfit.interceptor.interface';

/**
 * Interface to match the request for an axios interceptor.
 */
export interface AxiosfitRequestInterceptor extends AxiosfitInterceptor {
  onRequest(config: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig>;
}
