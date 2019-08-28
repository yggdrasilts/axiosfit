import { serviceMap, createServiceMap } from './Utilities';
import { IAxiosfit } from '../interfaces/Interfaces';

/**
 * Parameter decorator.
 * Indicates that this parameter is used as a path inside the url.
 *
 * @param {string} paramName Parameter name.
 */
export function Path(paramName: string) {
  // tslint:disable-next-line: only-arrow-functions
  return function(target: any, methodName: string, parameterIndex: number) {
    let service: IAxiosfit = serviceMap[target.constructor.name];
    if (!service) {
      createServiceMap(target.constructor);
      service = serviceMap[target.constructor.name];
    }
    service.addSegment(methodName, { name: paramName, index: parameterIndex });
  };
}

/**
 * Parameter decorator.
 * Indicates that this parameter is used as body to be sent as data.
 */
export function Body() {
  // tslint:disable-next-line: only-arrow-functions
  return function(target: any, methodName: string, parameterIndex: number) {
    let service: IAxiosfit = serviceMap[target.constructor.name];
    if (!service) {
      createServiceMap(target.constructor);
      service = serviceMap[target.constructor.name];
    }
    service.setData(methodName, parameterIndex);
  };
}
