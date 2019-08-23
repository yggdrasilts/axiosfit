import * as mockServer from 'mock-json-server';

import { Axiosfit, AxiosResponse, AxiosError } from '../src';

import { TestService } from './services/TestService';

let mockApp;

describe('testService', () => {
  const testService = new Axiosfit<TestService>().baseUrl('http://localhost:8000').create(TestService);

  beforeAll(() => {
    mockApp = mockServer(
      {
        '/test/demo': {
          get: 'getDemo',
        },
        '/test/demo/param1': {
          get: 'getWithParam',
        },
        '/test/demo/param1/param2': {
          get: 'getWithParams',
        },
      },
      8000,
      'localhost',
    );
    mockApp.start();
  });

  afterAll(() => {
    mockApp.stop();
  });

  describe('GET methods', () => {
    it('without parameters', done => {
      const okFunc = (response: AxiosResponse<string>, check: string) => {
        expect(response.data).toBe(check);
        done();
      };
      const errorFunc = (error: AxiosError<any>) => {
        expect(error).toBeNull();
        done.fail();
      };

      testService.getDemo().subscribe((response: AxiosResponse<string>) => {
        okFunc(response, 'getDemo');
      }, errorFunc);
    });

    it('with only one parameter', done => {
      const okFunc = (response: AxiosResponse<string>, check: string) => {
        expect(response.data).toBe(check);
        done();
      };
      const errorFunc = (error: AxiosError<any>) => {
        expect(error).toBeNull();
        done.fail();
      };

      testService.getWithParam('param1').subscribe((response: AxiosResponse<string>) => {
        okFunc(response, 'getWithParam');
      }, errorFunc);
    });

    it('with some parameters', done => {
      const okFunc = (response: AxiosResponse<string>, check: string) => {
        expect(response.data).toBe(check);
        done();
      };
      const errorFunc = (error: AxiosError<any>) => {
        expect(error).toBeNull();
        done.fail();
      };

      testService.getWithParams('param1', 'param2').subscribe((response: AxiosResponse<string>) => {
        okFunc(response, 'getWithParams');
      }, errorFunc);
    });
  });
});
