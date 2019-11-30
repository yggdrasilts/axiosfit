import { AxiosRequestConfig } from 'axios';
import { AxiosfitInterceptor } from './axiosfit.interceptor.interface';

/**
 * Interface to match the request for an axios interceptor.
 * @deprecated Since version 0.5.0. Will be deleted in version 0.6.0. Use {@link AxiosfitRequestInterceptor} instead.
 */
export interface AxiosfitInterceptorRequest {
  onFulFilled?: (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
  onRejected?: (error: any) => any;
}

/**
 * Interface to match the request for an axios interceptor.
 */
export interface AxiosfitRequestInterceptor extends AxiosfitInterceptor {
  onRequest(config: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig>;
}
