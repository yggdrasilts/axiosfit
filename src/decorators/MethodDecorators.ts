import { Observable, defer } from 'rxjs';
import { AxiosResponse } from 'axios';

import { serviceMap, createServiceMap } from './Utilities';
import { IAxiosfit } from '../interfaces/Interfaces';
import { Method } from '../http/Method';

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

/**
 * Function to be used for no data http methods.
 *
 * @param {string} endpoint The endpoint.
 * @param {Method} method HTTP method that sents no data inside the body.
 */
// tslint:disable-next-line: only-arrow-functions
const noDataFunction = function(endpoint: string, method: Method) {
  // tslint:disable-next-line: only-arrow-functions
  return function(target: any, methodName: string, descriptor: PropertyDescriptor) {
    // tslint:disable-next-line: only-arrow-functions
    descriptor.value = function<T = any>(...args: any[]): Observable<AxiosResponse<T>> {
      const service = prepareService(target, methodName, endpoint, args);
      switch (method) {
        case Method.GET:
          return defer(() => service.instance.get<T>(service.getUrl(methodName), service.config));
        case Method.DELETE:
          return defer(() => service.instance.delete<T>(service.getUrl(methodName), service.config));
        case Method.HEAD:
          return defer(() => service.instance.head<T>(service.getUrl(methodName), service.config));
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
// tslint:disable-next-line: only-arrow-functions
const dataFunction = function(endpoint: string, method: Method) {
  // tslint:disable-next-line: only-arrow-functions
  return function(target: any, methodName: string, descriptor: PropertyDescriptor) {
    // tslint:disable-next-line: only-arrow-functions
    descriptor.value = function<T = any>(...args: any[]): Observable<AxiosResponse<T>> {
      const service = prepareService(target, methodName, endpoint, args);
      switch (method) {
        case Method.POST:
          return defer(() => service.instance.post<T>(service.getUrl(methodName), args[service.getData(methodName)], service.config));
        case Method.PUT:
          return defer(() => service.instance.put<T>(service.getUrl(methodName), args[service.getData(methodName)], service.config));
        case Method.PATCH:
          return defer(() => service.instance.patch<T>(service.getUrl(methodName), args[service.getData(methodName)], service.config));
      }
    };
    return descriptor;
  };
};

/**
 * Prepare the service to be requested.
 *
 * @param {any} target
 * @param {string} methodName Method name.
 * @param {string} endpoint Endpoint to be used.
 * @param {any[]} args Parameters arguments.
 */
const prepareService = (target: any, methodName: string, endpoint: string, args: any[]): IAxiosfit => {
  let service: IAxiosfit = serviceMap[target.constructor.name];
  if (!service) {
    createServiceMap(target.constructor);
    service = serviceMap[target.constructor.name];
  }
  const segments = service.getSegments(methodName);
  let replacedEndpoint = endpoint;
  if (segments) {
    for (const [index, paramValue] of segments.entries()) {
      replacedEndpoint = replacedEndpoint.replace(`:${paramValue}`, args[index]);
    }
  }
  service.addUrl(methodName, replacedEndpoint);
  return service;
};
