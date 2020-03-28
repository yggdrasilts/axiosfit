import 'reflect-metadata';

import { Observable, defer } from 'rxjs';

import { AxiosResponse } from 'axios';

import { StringUtils } from '@yggdrasilts/volundr';

import { IAxiosfit } from '../interfaces';
import { Method } from '../http/enums';
import { serviceMap } from './utilities';

/**
 * Prepare the service to be requested.
 *
 * @param {any} target
 * @param {string} methodName Method name.
 * @param {string} endpoint Endpoint to be used.
 * @param {any[]} args Parameters arguments.
 */
const prepareService = (target: any, methodName: string, endpoint: string, args: any[]): IAxiosfit => {
  const serviceName = target.constructor.serviceName || target.constructor.name;
  const service: IAxiosfit = serviceMap[serviceName];
  const segments = service.getSegments(methodName);
  const parameters = service.getParameters(methodName);
  const params = new Map<string, string>();
  // TODO: Use StringUtils.SLASH from last @yggdrasilts/volundr version
  let replacedEndpoint = endpoint.startsWith('/') ? endpoint : StringUtils.join('/', endpoint);
  // Get segments, if there are, to be replaced in the path
  if (segments) {
    for (const [index, paramValue] of segments.entries()) {
      replacedEndpoint = replacedEndpoint.replace(`:${paramValue}`, args[index]);
    }
  }
  // Get parameters, if there are, to be added to the request
  if (parameters) {
    for (const [index, paramValue] of parameters.entries()) {
      if (typeof args[index] === 'string') {
        params[paramValue] = args[index];
      } else {
        const paramMap = args[index];
        for (const mapKey in paramMap) {
          if (paramMap.hasOwnProperty(mapKey)) {
            params[mapKey] = paramMap[mapKey];
          }
        }
      }
    }
    service.setParameters(params);
  }
  service.addUrl(methodName, replacedEndpoint);

  const headers = service.getHeadersMap(methodName);
  const innerHeaders = {};
  if (headers) {
    for (const [index, headerValue] of headers.entries()) {
      if (typeof args[index] === 'string') {
        innerHeaders[headerValue] = args[index];
      } else {
        const paramMap = args[index];
        for (const mapKey in paramMap) {
          if (paramMap.hasOwnProperty(mapKey)) {
            innerHeaders[mapKey] = paramMap[mapKey];
          }
        }
      }
    }
  }
  service.setConfig({ headers: innerHeaders });
  return service;
};

/**
 * Function to return the results.
 *
 * @param {boolean} usePromises Indicates is the result is returned as Promise or not. Default: false.
 * @param {Function} consumer Function to be executed.
 * @param {string} target The prototype of our class (or the constructor of the class if the decorated method is static).
 * @param {string} methodName The name of the decorated method.
 */
const resultFunction = <T = any>(
  usePromises = false,
  consumer: Promise<AxiosResponse<T>>,
): Observable<AxiosResponse<T>> | Promise<AxiosResponse<T>> => {
  if (usePromises) {
    return consumer;
  }
  return defer(() => consumer);
};

/**
 * Function to be used for no data http methods.
 *
 * @param {string} endpoint The endpoint.
 * @param {Method} method HTTP method that sents no data inside the body.
 */
const noDataFunction = (endpoint: string, method: Method) => {
  /**
   * @param {any} target The prototype of our class (or the constructor of the class if the decorated method is static).
   * @param {string} methodName The name of the decorated method.
   * @param {PropertyDescriptor} descriptor An object that holds the decorated function and some meta-data regarding it.
   */
  return (target: any, methodName: string, descriptor: PropertyDescriptor) => {
    descriptor.value = <T = any>(...args: any[]): Observable<AxiosResponse<T>> | Promise<AxiosResponse<T>> => {
      const service = prepareService(target, methodName, endpoint, args);
      switch (method) {
        case Method.GET:
          return resultFunction(
            service.AxiosfitConfig.usePromises,
            service.instance.get<T>(service.getUrl(methodName), service.axiosConfig),
          );
        case Method.DELETE:
          return resultFunction(
            service.AxiosfitConfig.usePromises,
            service.instance.delete<T>(service.getUrl(methodName), service.axiosConfig),
          );
        case Method.HEAD:
          return resultFunction(
            service.AxiosfitConfig.usePromises,
            service.instance.head<T>(service.getUrl(methodName), service.axiosConfig),
          );
      }
    };
    return descriptor;
  };
};

/**
 * Function to be used for data http methods.
 *
 * @param {string} endpoint The endpoint.
 * @param {Method} method HTTP method that sents data inside the body.
 */
const dataFunction = (endpoint: string, method: Method) => {
  /**
   * @param {any} target The prototype of our class (or the constructor of the class if the decorated method is static).
   * @param {string} methodName The name of the decorated method.
   * @param {PropertyDescriptor} descriptor An object that holds the decorated function and some meta-data regarding it.
   */
  return (target: any, methodName: string, descriptor: PropertyDescriptor) => {
    descriptor.value = <T = any>(...args: any[]): Observable<AxiosResponse<T>> | Promise<AxiosResponse<T>> | T => {
      const service = prepareService(target, methodName, endpoint, args);
      switch (method) {
        case Method.POST:
          return resultFunction(
            service.AxiosfitConfig.usePromises,
            service.instance.post<T>(service.getUrl(methodName), args[service.getData(methodName)], service.axiosConfig),
          );
        case Method.PUT:
          return resultFunction(
            service.AxiosfitConfig.usePromises,
            service.instance.put<T>(service.getUrl(methodName), args[service.getData(methodName)], service.axiosConfig),
          );
        case Method.PATCH:
          return resultFunction(
            service.AxiosfitConfig.usePromises,
            service.instance.patch<T>(service.getUrl(methodName), args[service.getData(methodName)], service.axiosConfig),
          );
      }
    };
    return descriptor;
  };
};

/**
 * Method decorator.
 * Indicates that this method use a get request.
 *
 * @param {string} endpoint Method endpoint.
 */
export function GET(endpoint: string) {
  return noDataFunction(endpoint, Method.GET);
}

/**
 * Method decorator.
 * Indicates that this method use a delete request.
 *
 * @param {string} endpoint Method endpoint.
 */
export function DELETE(endpoint: string) {
  return noDataFunction(endpoint, Method.DELETE);
}

/**
 * Method decorator.
 * Indicates that this method use a head request.
 *
 * @param {string} endpoint Method endpoint.
 */
export function HEAD(endpoint: string) {
  return noDataFunction(endpoint, Method.HEAD);
}

/**
 * Method decorator.
 * Indicates that this method use a post request.
 *
 * @param {string} endpoint Method endpoint.
 */
export function POST(endpoint: string) {
  return dataFunction(endpoint, Method.POST);
}

/**
 * Method decorator.
 * Indicates that this method use a put request.
 *
 * @param {string} endpoint Method endpoint.
 */
export function PUT(endpoint: string) {
  return dataFunction(endpoint, Method.PUT);
}

/**
 * Method decorator.
 * Indicates that this method use a patch request.
 *
 * @param {string} endpoint Method endpoint.
 */
export function PATCH(endpoint: string) {
  return dataFunction(endpoint, Method.PATCH);
}

// TODO: Add this decorator
//export function Headers(headers: string | { [key: string]: string }) {
/**
 * @param {any} target The prototype of our class (or the constructor of the class if the decorated method is static).
 * @param {string} methodName The name of the decorated method.
 * @param {PropertyDescriptor} descriptor An object that holds the decorated function and some meta-data regarding it.
 */
/*return (target: any, methodName: string, descriptor: PropertyDescriptor) => {
    const serviceName = target.constructor.serviceName || target.constructor.name;
    console.log('[method.decorator] - Headers - serviceName', serviceName);
    console.log('[method.decorator] - Headers - serviceMap', serviceMap);
    const service: IAxiosfit = serviceMap[serviceName];
    console.log('[method.decorator] - Headers - headers', headers);
    service.addHeaders(headers);
  };
}*/
