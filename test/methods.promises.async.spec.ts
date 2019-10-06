import { Axiosfit, AxiosError } from '../src';

import { TestPromiseServiceNoBase } from './services/promises/TestPromiseServicesNoBase';
import { TestPromiseService } from './services/promises/TestPromiseService';

import testData from './mockServer/data/testData.json';

describe('Testing Methods using async Promise responses', () => {
  const okFunc = (response: string, check: string, done: any) => {
    expect(response).toBe(check);
    done();
  };
  const errorFunc = (error: AxiosError<any>, done: any) => {
    expect(error).toBeNull();
    done.fail(error);
  };

  describe('TestServiceNoBase', () => {
    const testServiceNoBase = new Axiosfit<TestPromiseServiceNoBase>()
      .baseUrl(process.env.MOCK_SERVER_URL)
      .create(TestPromiseServiceNoBase);

    describe('GET methods', () => {
      it('without parameters', async () => {
        try {
          const axiosResponse = await testServiceNoBase.performGetRequest();
          expect(axiosResponse.data).toBe(testData.GET.performGetRequest.check);
        } catch (error) {
          expect(error).toBeNull();
        }
      });

      it('without parameters and getting an error', async () => {
        try {
          const axiosResponse = await testServiceNoBase.performGetRequestWithError();
          fail();
        } catch (error) {
          expect(error).not.toBeNull();
        }
      });
    });
  });

  describe('TestService', () => {
    const testService = new Axiosfit<TestPromiseService>().baseUrl(process.env.MOCK_SERVER_URL).create(TestPromiseService);

    describe('GET methods', () => {
      it('without parameters', async () => {
        try {
          const axiosResponse = await testService.performGetRequest();
          expect(axiosResponse.data).toBe(testData.GET.performGetRequest.check);
        } catch (error) {
          expect(error).toBeNull();
        }
      });

      it('with only one parameter', async () => {
        try {
          const axiosResponse = await testService.performGetRequestUsingAPathVariable('param1');
          expect(axiosResponse.data).toBe(testData.GET.performGetRequestUsingAPathVariable.check);
        } catch (error) {
          expect(error).toBeNull();
        }
      });

      it('with some parameters', async () => {
        try {
          const axiosResponse = await testService.performGetRequestUsingPathVariables('param1', 'param2');
          expect(axiosResponse.data).toBe(testData.GET.performGetRequestUsingPathVariables.check);
        } catch (error) {
          expect(error).toBeNull();
        }
      });
    });

    describe('DELETE methods', () => {
      it('without parameters', async () => {
        try {
          const axiosResponse = await testService.performDeleteRequest();
          expect(axiosResponse.data).toBe(testData.DELETE.performDeleteRequest.check);
        } catch (error) {
          expect(error).toBeNull();
        }
      });
    });

    describe('POST methods', () => {
      it('without parameters', async () => {
        try {
          const axiosResponse = await testService.performPostRequest({ data: 'data' });
          expect(axiosResponse.data).toEqual(testData.POST.performPostRequest.check);
        } catch (error) {
          expect(error).toBeNull();
        }
      });
    });

    describe('PUT methods', () => {
      it('without parameters', async () => {
        try {
          const axiosResponse = await testService.performPutRequest({ data: 'data' });
          expect(axiosResponse.data).toEqual(testData.PUT.performPutRequest.check);
        } catch (error) {
          expect(error).toBeNull();
        }
      });
    });

    describe('PATCH methods', () => {
      it('without parameters', async () => {
        try {
          const axiosResponse = await testService.performPatchRequest({ data: 'data' });
          expect(axiosResponse.data).toEqual(testData.PATCH.performPatchRequest.check);
        } catch (error) {
          expect(error).toBeNull();
        }
      });
    });
  });
});
