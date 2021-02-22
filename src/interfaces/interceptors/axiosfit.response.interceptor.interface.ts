import { AxiosResponse } from 'axios';

import { AxiosfitInterceptor } from './axiosfit.interceptor.interface';

/**
 * Interface to match the response for an axios interceptor.
 */
export interface AxiosfitResponseInterceptor<T> extends AxiosfitInterceptor {
  onResponse(response: AxiosResponse): T | Promise<T>;
}
