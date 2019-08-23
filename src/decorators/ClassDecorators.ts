import { createServiceMap, serviceMap } from './Utilities';

/**
 * Class decorator.
 * Indicates that this class is an Axiosfit service.
 *
 * @param {string} [endpointPath] Optional. Common endpoint for all the methods inside the class.
 */
export function HTTP(endpointPath?: string) {
  // tslint:disable-next-line: only-arrow-functions
  return function(constructor) {
    if (!serviceMap[constructor.name]) {
      createServiceMap(constructor);
    }
    serviceMap[constructor.name].setBaseServiceEndpoint(endpointPath);
  };
}
