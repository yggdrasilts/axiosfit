import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { IAxiosfit, ISegment } from '../interfaces/Interfaces';

/**
 * Contains the url mappings.
 */
export const serviceMap: Map<string, IAxiosfit> = new Map();

// tslint:disable-next-line: only-arrow-functions
export const createServiceMap = function(constructor) {
  if (!serviceMap[constructor.name]) {
    serviceMap[constructor.name] = new (class extends constructor implements IAxiosfit {
      private axiosInstance: AxiosInstance = Axios;
      private axiosConfig: AxiosRequestConfig = {};

      /**
       * Stores the service common endpoint for all the methods.
       *
       * @private
       * @type {string} Common endpoint.
       */
      private baseServiceEndpoint: string;

      /**
       * Contains the urls for every method.
       *
       * @private
       * @type {Map<string, string>} key: methodName, value: url.
       */
      private urlMap: Map<string, string> = new Map();

      /**
       * Contains all the segments to replace in the urls.
       *
       * @private
       * @type {Map<string, Map<number, string>>} key: methodName, value, segment map where: [key: index, value: segmentName]
       */
      private segmentsMap: Map<string, Map<number, string>> = new Map();

      /**
       * Sets the service common endpoint.
       *
       * @param {string} baseServiceEndpoint Common endpoint.
       */
      setBaseServiceEndpoint(baseServiceEndpoint: string) {
        this.baseServiceEndpoint = baseServiceEndpoint;
      }

      /**
       * Mixes the Axiosfit configurations with defaults.
       *
       * @param {AxiosRequestConfig} config.
       */
      setConfig(config: AxiosRequestConfig) {
        // TODO: mixin configs
        this.axiosConfig = config;
      }

      /**
       * Adds url to the Axiosfit map.
       *
       * @param {string} key Key to localize the url.
       * @param {string} url Url.
       */
      addUrl(key: string, url: string): void {
        this.urlMap[key] = `${this.axiosConfig.baseURL}${this.baseServiceEndpoint}${url}`;
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

      getSegments(key: string): Map<number, string> {
        return this.segmentsMap[key];
      }

      get baseEndpoint(): string {
        return this.baseServiceEndpoint;
      }

      get instance(): AxiosInstance {
        return this.axiosInstance;
      }

      get config(): AxiosRequestConfig {
        return this.axiosConfig;
      }
    })();
  }
};
