import 'reflect-metadata';

import { Observable, defer, isObservable } from 'rxjs';

import { AxiosResponse } from 'axios';

import { ReturnedTypeNotValidException } from '../exceptions';

import { IAxiosfit } from '../interfaces';
import { Method } from '../http/enums';
import { serviceMap, createServiceMap } from './utilities';

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
 * Check if the type is a Promise.
 *
 * @param {any} type Type to check.
 */
const isAPromise = <T>(type: new () => T): boolean => {
  try {
    const service = new type();
    if (isObservable(service)) {
      return false;
    }
    throw new ReturnedTypeNotValidException();
  } catch (error) {
    if (error instanceof ReturnedTypeNotValidException) {
      throw error;
    }
    return true;
  }
};

/**
 * Function to return the results.
 *
 * @param {Function} consumer Function to be executed.
 * @param {string} target The prototype of our class (or the constructor of the class if the decorated method is static).
 * @param {string} methodName The name of the decorated method.
 */
const resultFunction = <T = any>(
  consumer: Promise<AxiosResponse<T>>,
  target: string,
  methodName: string,
): Observable<AxiosResponse<T>> | Promise<AxiosResponse<T>> => {
  const returnTypeIsPromise = isAPromise(Reflect.getMetadata('design:returntype', target, methodName));
  if (returnTypeIsPromise) {
    return consumer;
  } else {
    return defer(() => consumer);
  }
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
          return resultFunction(service.instance.get<T>(service.getUrl(methodName), service.config), target, methodName);
        case Method.DELETE:
          return resultFunction(service.instance.delete<T>(service.getUrl(methodName), service.config), target, methodName);
        case Method.HEAD:
          return resultFunction(service.instance.head<T>(service.getUrl(methodName), service.config), target, methodName);
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
            service.instance.post<T>(service.getUrl(methodName), args[service.getData(methodName)], service.config),
            target,
            methodName,
          );
        case Method.PUT:
          return resultFunction(
            service.instance.put<T>(service.getUrl(methodName), args[service.getData(methodName)], service.config),
            target,
            methodName,
          );
        case Method.PATCH:
          return resultFunction(
            service.instance.patch<T>(service.getUrl(methodName), args[service.getData(methodName)], service.config),
            target,
            methodName,
          );
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
  const serviceName = target.constructor.serviceName || target.constructor.name;
  const service: IAxiosfit = serviceMap[serviceName];
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
