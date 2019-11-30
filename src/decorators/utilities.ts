import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import {
  IAxiosfit,
  ISegment,
  AxiosfitInterceptor,
  AxiosfitRequestInterceptor,
  AxiosfitResponseInterceptor,
  AxiosfitConfig,
} from 'src/interfaces';

/**
 * Contains the url mappings.
 */
export const serviceMap: Map<string, IAxiosfit> = new Map();

/**
 * Creates the serviceMap with the correspondent Axiosfit service.
 */
// tslint:disable-next-line: only-arrow-functions
export const createServiceMap = function(constructor) {
  const serviceName = constructor.serviceName || constructor.name;
  if (!serviceMap[serviceName]) {
    serviceMap[serviceName] = new (class extends constructor implements IAxiosfit {
      private axiosInstance: AxiosInstance = Axios;
      private axiosRequestConfig: AxiosRequestConfig = {};

      /**
       * Axiosfit internal configuration.
       *
       * @private
       * @type {AxiosfitConfig}
       */
      private axiosfitConfig: AxiosfitConfig = {
        usePromises: false,
      };

      /**
       * Stores the service common endpoint for all the methods.
       *
       * @private
       * @type {string} Common endpoint.
       */
      private baseServiceEndpoint: string;

      private globalInterceptors: AxiosfitInterceptor[];

      /**
       * Contains the urls for every method.
       *
       * @private
       * @type {Map<string, string>} key: methodName; value: url.
       */
      private urlMap: Map<string, string> = new Map();

      /**
       * Contains all the segments to replace in the urls.
       *
       * @private
       * @type {Map<string, Map<number, string>>} key: methodName; value: segment map where: [key: index, value: segmentName]
       */
      private segmentsMap: Map<string, Map<number, string>> = new Map();

      /**
       * Contains the data to be sent in a post request.
       *
       * @private
       * @type {Map<string, number>} key: methodName; value: parameter index where the data object is.
       */
      private dataMap: Map<string, number> = new Map();

      /**
       * Sets the service common endpoint.
       *
       * @param {string} baseServiceEndpoint Common endpoint.
       */
      setBaseServiceEndpoint(baseServiceEndpoint: string) {
        this.baseServiceEndpoint = baseServiceEndpoint;
      }

      setGlobalInterceptors(globalInterceptors: AxiosfitInterceptor[] | AxiosfitRequestInterceptor[] | AxiosfitResponseInterceptor[]) {
        const list: AxiosfitInterceptor[] = [];
        for (const interceptor of globalInterceptors) {
          list.push(new (interceptor as any)());
        }
        this.setInterceptors(list);
      }

      getAxiosfitConfig(): AxiosfitConfig {
        return this.axiosfitConfig;
      }

      /**
       * Mixes the Axiosfit configurations with defaults.
       *
       * @param {AxiosRequestConfig} config.
       */
      setConfig(config: AxiosRequestConfig) {
        // TODO: mixin configs
        this.axiosRequestConfig = config;
      }

      /**
       * Set axios interceptors.
       *
       * @param {AxiosfitInterceptor | AxiosfitRequestInterceptor | AxiosfitResponseInterceptor} interceptors Array with the interceptors.
       */
      setInterceptors(interceptors: AxiosfitInterceptor[] | AxiosfitRequestInterceptor[] | AxiosfitResponseInterceptor[]) {
        // tslint:disable-next-line: no-console
        const defaultError = (error: any) => console.error(error);
        for (const interceptor of interceptors) {
          // REMOVE: Delete this in version 0.6.0
          if ((interceptor as AxiosfitInterceptor).request) {
            this.axiosInstance.interceptors.request.use(
              (interceptor as AxiosfitInterceptor).request.onFulFilled,
              (interceptor as AxiosfitInterceptor).request.onRejected || defaultError,
            );
          }
          // REMOVE: Delete this in version 0.6.0
          if ((interceptor as AxiosfitInterceptor).response) {
            this.axiosInstance.interceptors.response.use(
              (interceptor as AxiosfitInterceptor).response.onFulFilled,
              (interceptor as AxiosfitInterceptor).response.onRejected || defaultError,
            );
          }
          if ((interceptor as AxiosfitRequestInterceptor).onRequest !== undefined) {
            this.axiosInstance.interceptors.request.use(
              (interceptor as AxiosfitRequestInterceptor).onRequest,
              (interceptor as AxiosfitRequestInterceptor).onError || defaultError,
            );
          }
          if ((interceptor as AxiosfitResponseInterceptor).onResponse !== undefined) {
            this.axiosInstance.interceptors.request.use(
              (interceptor as AxiosfitResponseInterceptor).onResponse,
              (interceptor as AxiosfitResponseInterceptor).onError || defaultError,
            );
          }
        }
      }

      /**
       * Adds url to the Axiosfit map.
       *
       * @param {string} key Key to localize the url.
       * @param {string} url Url.
       */
      addUrl(key: string, url: string): void {
        this.urlMap[key] = `${this.axiosRequestConfig.baseURL}${this.baseServiceEndpoint}${url}`;
      }

      /**
       * Gets the url from the Axiosfit map.
       *
       * @param {string} key Key to localize the url.
       * @returns {string} Url.
       */
      getUrl(key: string): string {
        return this.urlMap[key];
      }

      /**
       * Adds segments to be replaced in the correspondent url.
       *
       * @param {string} key Key to localize the segments.
       * @param {ISegment} segment Segmet.
       */
      addSegment(key: string, segment: ISegment): void {
        if (!this.segmentsMap[key]) {
          this.segmentsMap[key] = new Map();
        }
        this.segmentsMap[key].set(segment.index, segment.name);
      }

      /**
       * Gets the segments to be replaced in the correspondent url.
       *
       * @param {string} key Key to localize the segments.
       * @returns {Map<number, string>} Segments to be replaced.
       */
      getSegments(key: string): Map<number, string> {
        return this.segmentsMap[key];
      }

      /**
       * Stores the data to be sent.
       *
       * @param {string} key Key to localize the data.
       * @param {number} parameterIndex Where the data object is.
       */
      setData(key: string, parameterIndex: number): void {
        this.dataMap.set(key, parameterIndex);
      }

      /**
       * Gets the data to be sent.
       *
       * @param {string} key Key to localize the data.
       * @returns {number} Where the data object is.
       */
      getData(key: string): number {
        return this.dataMap.get(key);
      }

      get baseEndpoint(): string {
        return this.baseServiceEndpoint;
      }

      get instance(): AxiosInstance {
        return this.axiosInstance;
      }

      get axiosConfig(): AxiosRequestConfig {
        return this.axiosRequestConfig;
      }
    })();
  }
};
