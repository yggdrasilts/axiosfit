import { AxiosResponse } from 'axios';

/**
 * Interface to match the response for an axios interceptor.
 */
export interface AxiosfitInterceptorResponse {
  onFulFilled?: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
  onRejected?: (error: any) => any;
}
