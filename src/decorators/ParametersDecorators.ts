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
    const name = target.constructor.name;
    let service: IAxiosfit = serviceMap[name];
    if (!service) {
      createServiceMap(target.constructor);
      service = serviceMap[name];
    }
    service.addSegment(methodName, { name: paramName, index: parameterIndex });
  };
}
