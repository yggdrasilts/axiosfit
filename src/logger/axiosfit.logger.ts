import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import buildURL from 'axios/lib/helpers/buildURL';

import { AxiosfitRequestInterceptor, AxiosfitResponseInterceptor } from '../interfaces';

const getURL = (config: AxiosRequestConfig): string => {
  return buildURL(config.url, config.params, config.paramsSerializer);
};

export class AxiosfitLogger implements AxiosfitRequestInterceptor, AxiosfitResponseInterceptor {
  onRequest(config: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig> {
    // tslint:disable-next-line: no-console
    console.log('[REQUEST]', config.method.toUpperCase(), getURL(config));
    return config;
  }

  onResponse(response: AxiosResponse<any>): AxiosResponse<any> | Promise<AxiosResponse<any>> {
    // tslint:disable-next-line: no-console
    console.log(
      '[RESPONSE]',
      response.status,
      response.statusText,
      '(',
      response.config.method.toUpperCase(),
      getURL(response.config),
      ')',
    );
    return response;
  }

  onError(error: AxiosError<any>): AxiosError<any> {
    if (error.config) {
      // tslint:disable-next-line: no-console
      console.log('[ERROR]', error.name, ':', error.message, '(', error.config.method.toUpperCase(), getURL(error.config), ')');
    } else {
      // tslint:disable-next-line: no-console
      console.log('[ERROR]', error.name, ':', error.message);
    }
    throw error;
  }
}
