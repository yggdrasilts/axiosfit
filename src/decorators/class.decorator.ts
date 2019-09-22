import { createServiceMap, serviceMap } from './utilities';

/**
 * Class decorator.
 * Indicates that this class is an Axiosfit service.
 *
 * @param {string} [endpointPath] Optional. Common endpoint for all the methods inside the class.
 */
export const HTTP = (endpointPath?: string) => {
  return constructor => {
    if (!serviceMap[constructor.name]) {
      createServiceMap(constructor);
    }
    serviceMap[constructor.name].setBaseServiceEndpoint(endpointPath || '');
  };
};
