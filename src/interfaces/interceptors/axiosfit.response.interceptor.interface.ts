import { AxiosResponse } from 'axios';
import { AxiosfitInterceptor } from './axiosfit.interceptor.interface';

/**
 * Interface to match the response for an axios interceptor.
 * @deprecated Since version 0.5.0. Will be deleted in version 0.6.0. Use {@link AxiosfitResponseInterceptor} instead.
 */
export interface AxiosfitInterceptorResponse {
  onFulFilled?: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
  onRejected?: (error: any) => any;
}

/**
 * Interface to match the response for an axios interceptor.
 */
export interface AxiosfitResponseInterceptor extends AxiosfitInterceptor {
  onResponse(response: AxiosResponse): AxiosResponse | Promise<AxiosResponse>;
}
