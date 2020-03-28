import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import buildURL from 'axios/lib/helpers/buildURL';

import { AxiosfitRequestInterceptor, AxiosfitResponseInterceptor } from '../interfaces';

const INFO = false;
const ERROR = true;

const _getURL = (config: AxiosRequestConfig): string => {
  return buildURL(config.url, config.params, config.paramsSerializer);
};

const _printLog = (error: boolean, ...message: any[]): void => {
  const date = new Date();
  const timestamp = [date.toLocaleDateString(), date.toLocaleTimeString()];
  const axiosfitMessage = ['[Axiosfit] -', ...timestamp, ...message];
  if (error) {
    // tslint:disable-next-line: no-console
    console.error(...axiosfitMessage);
  } else {
    // tslint:disable-next-line: no-console
    console.log(...axiosfitMessage);
  }
};

const _getHeaders = (config: AxiosRequestConfig): string => {
  return `[HEADERS: ${JSON.stringify(config.headers)}]`;
};

export class AxiosfitLogger implements AxiosfitRequestInterceptor, AxiosfitResponseInterceptor {
  onRequest(config: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig> {
    _printLog(INFO, '[REQUEST]', config.method.toUpperCase(), _getURL(config), _getHeaders(config));
    return config;
  }

  onResponse(response: AxiosResponse<any>): AxiosResponse<any> | Promise<AxiosResponse<any>> {
    _printLog(
      INFO,
      '[RESPONSE]',
      response.status,
      response.statusText,
      '(',
      response.config.method.toUpperCase(),
      _getURL(response.config),
      ')',
    );
    return response;
  }

  onError(error: AxiosError<any>): AxiosError<any> {
    if (error.config) {
      _printLog(ERROR, '[ERROR]', error.name, ':', error.message, '(', error.config.method.toUpperCase(), _getURL(error.config), ')');
    } else {
      _printLog(ERROR, '[ERROR]', error.name, ':', error.message);
    }
    throw error;
  }
}
