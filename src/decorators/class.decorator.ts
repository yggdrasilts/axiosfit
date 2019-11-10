import { createServiceMap, serviceMap } from './utilities';
import { AxiosfitInterceptor, AxiosfitRequestInterceptor, AxiosfitResponseInterceptor } from '../interfaces';

/**
 * Class decorator.
 * Indicates that this class is an Axiosfit service.
 *
 * @param {string} [endpointPath] Optional. Common endpoint for all the methods inside the class.
 */
export function HTTP(endpointPath?: string) {
  return constructor => {
    const serviceName = constructor.serviceName || constructor.name;
    if (!serviceMap[serviceName]) {
      createServiceMap(constructor);
    }
    serviceMap[serviceName].setBaseServiceEndpoint(endpointPath || '');
  };
}

/**
 * Class decorator.
 * Decorator to be used to add a global request interceptor.
 *
 * @param {AxiosfitInterceptor[]} interceptors The interceptors.
 */
export function Interceptors<T = AxiosfitInterceptor | AxiosfitRequestInterceptor | AxiosfitResponseInterceptor>(...interceptors: T[]) {
  return constructor => {
    const serviceName = constructor.serviceName || constructor.name;
    if (!serviceMap[serviceName]) {
      createServiceMap(constructor);
    }
    serviceMap[serviceName].setGlobalInterceptors(interceptors);
  };
}
