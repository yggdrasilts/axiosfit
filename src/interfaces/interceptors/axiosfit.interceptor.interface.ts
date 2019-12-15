/**
 * Interface to match an axios interceptor.
 */
export interface AxiosfitInterceptor {
  onError?(error: any): any;
}
