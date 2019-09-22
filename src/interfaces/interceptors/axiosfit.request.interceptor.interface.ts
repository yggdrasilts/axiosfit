import { AxiosRequestConfig } from 'axios';

/**
 * Interface to match the request for an axios interceptor.
 */
export interface AxiosfitInterceptorRequest {
  onFulFilled?: (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
  onRejected?: (error: any) => any;
}
