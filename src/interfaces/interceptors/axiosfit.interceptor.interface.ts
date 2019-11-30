import { AxiosfitInterceptorRequest } from './axiosfit.request.interceptor.interface';
import { AxiosfitInterceptorResponse } from './axiosfit.response.interceptor.interface';

/**
 * Interface to match an axios interceptor.
 */
export interface AxiosfitInterceptor {
  request?: AxiosfitInterceptorRequest;
  response?: AxiosfitInterceptorResponse;

  onError?(error: any): any;
}
