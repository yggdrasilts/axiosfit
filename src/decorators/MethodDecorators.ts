import { Observable, defer } from 'rxjs';
import { AxiosResponse } from 'axios';

import { serviceMap, createServiceMap } from './Utilities';
import { IAxiosfit } from '../interfaces/Interfaces';

/**
 * Method decorator.
 * Indicates that this method use a get request.
 *
 * @param {string} endpoint Method endpoint.
 */
export function GET(endpoint: string) {
  // tslint:disable-next-line: only-arrow-functions
  return function(target: any, methodName: string, descriptor: PropertyDescriptor) {
    // tslint:disable-next-line: only-arrow-functions
    descriptor.value = function<T = any>(...args: any[]): Observable<AxiosResponse<T>> {
      const name = target.constructor.name;
      let service: IAxiosfit = serviceMap[name];
      if (!service) {
        createServiceMap(target.constructor);
        service = serviceMap[name];
      }
      const segments = service.getSegments(methodName);
      let replacedEndpoint = endpoint;
      if (segments) {
        for (const [index, paramValue] of segments.entries()) {
          replacedEndpoint = replacedEndpoint.replace(`:${paramValue}`, args[index]);
        }
      }
      service.addUrl(methodName, replacedEndpoint);
      return defer(() => service.instance.get<T>(service.getUrl(methodName), service.config));
    };
    return descriptor;
  };
}
