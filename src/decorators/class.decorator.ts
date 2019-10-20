import { createServiceMap, serviceMap } from './utilities';
import { AxiosfitInterceptor } from '../interfaces';

/**
 * Class decorator.
 * Indicates that this class is an Axiosfit service.
 *
 * @param {string} [endpointPath] Optional. Common endpoint for all the methods inside the class.
 */
export function HTTP(endpointPath?: string) {
  return constructor => {
    if (!serviceMap[constructor.name]) {
      createServiceMap(constructor);
    }
    serviceMap[constructor.name].setBaseServiceEndpoint(endpointPath || '');
  };
}

/**
 * Class decorator.
 * Decorator to be used to add a global request interceptor.
 *
 * @param {AxiosfitInterceptor[]} interceptors The interceptors.
 */
export function Interceptors<T = AxiosfitInterceptor>(...interceptors: T[]) {
  return constructor => {
    if (!serviceMap[constructor.name]) {
      createServiceMap(constructor);
    }
    serviceMap[constructor.name].setGlobalInterceptors(interceptors);
  };
}
