import { serviceMap, createServiceMap } from './utilities';
import { IAxiosfit } from 'src/interfaces';

/**
 * Get the service.
 *
 * @param {*} target
 * @returns {IAxiosfit}
 */
function _getService(target: any): IAxiosfit {
  const serviceName = target.constructor.serviceName || target.constructor.name;
  let service: IAxiosfit = serviceMap[serviceName];
  if (!service) {
    createServiceMap(target.constructor);
    service = serviceMap[serviceName];
  }
  return service;
}

/**
 * Private function to add parameters.
 *
 * @param {string} name Parameter name.
 */
function _addParameter(name: string) {
  return (target: any, methodName: string, parameterIndex: number) => {
    const service = _getService(target);
    service.addParameter(methodName, { name, index: parameterIndex });
  };
}

/**
 * Private function to add headers.
 *
 * @param {string} name Header name.
 * @returns
 */
function _addHeader(name: string) {
  return (target: any, methodName: string, parameterIndex: number) => {
    const service = _getService(target);
    service.addHeadersMap(methodName, { name, index: parameterIndex });
  };
}

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
 * Add a map with headers to the request.
 *
 * @param {string} headerName Header name.
 */
export function HeaderMap(headerName: string) {
  return _addHeader(headerName);
}

/**
 * Parameter decorator.
 * Add a header to the request.
 *
 * @param {string} headerName Header name.
 */
export function Header(headerName: string) {
  return _addHeader(headerName);
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
