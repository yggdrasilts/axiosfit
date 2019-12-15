import { serviceMap, createServiceMap } from './utilities';
import { IAxiosfit } from 'src/interfaces';

/**
 * Parameter decorator.
 * Add a parameter to the request.
 *
 * @param {string} paramName Parameter name.
 */
export function Param(paramName: string) {
  return _addParameter(paramName);
}

/**
 * Parameter decorator.
 * Add a map with parameters to the request.
 *
 * @param {string} paramName Parameter name.
 */
export function ParamMap(paramName: string) {
  return _addParameter(paramName);
}

/**
 * Parameter decorator.
 * Indicates that this parameter is used as a path inside the url.
 *
 * @param {string} paramName Parameter name.
 */
export function Path(paramName: string) {
  return (target: any, methodName: string, parameterIndex: number) => {
    const serviceName = target.constructor.serviceName || target.constructor.name;
    let service: IAxiosfit = serviceMap[serviceName];
    if (!service) {
      createServiceMap(target.constructor);
      service = serviceMap[serviceName];
    }
    service.addSegment(methodName, { name: paramName, index: parameterIndex });
  };
}

/**
 * Parameter decorator.
 * Indicates that this parameter is used as body to be sent as data.
 */
export function Body() {
  return (target: any, methodName: string, parameterIndex: number) => {
    const serviceName = target.constructor.serviceName || target.constructor.name;
    let service: IAxiosfit = serviceMap[serviceName];
    if (!service) {
      createServiceMap(target.constructor);
      service = serviceMap[serviceName];
    }
    service.setData(methodName, parameterIndex);
  };
}

/**
 * Private function to add parameters.
 *
 * @param {string} name Parameter name.
 */
function _addParameter(name: string) {
  return (target: any, methodName: string, parameterIndex: number) => {
    const serviceName = target.constructor.serviceName || target.constructor.name;
    let service: IAxiosfit = serviceMap[serviceName];
    if (!service) {
      createServiceMap(target.constructor);
      service = serviceMap[serviceName];
    }
    service.addParameter(methodName, { name, index: parameterIndex });
  };
}
