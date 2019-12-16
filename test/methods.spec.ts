import { Axiosfit, isObservable, AxiosError, AxiosResponse } from '../src';

import { TestService } from './services/TestService';

describe('Testing Methods errors', () => {
  const errorFunc = (error: AxiosError<any>, done: any) => {
    expect(error).toBeNull();
    done.fail();
  };

  describe('TestService', () => {
    const testService = new Axiosfit<TestService>().baseUrl(process.env.MOCK_SERVER_URL).create(TestService);

    describe('GET methods', () => {
      it('Not a valid Axiosfit', () => {
        const response = testService.performGetRequest();
        expect(isObservable(response)).toBeTruthy();
        expect(response.data).toBeUndefined();
      });

      it('Call with parameters', done => {
        const map = {
          mapName1: 'mapValue1',
          mapName2: 'mapValue2',
        };
        testService.performGetRequestWithParams('param1', map).subscribe(
          (response: AxiosResponse<string>) => {
            expect(Object.keys(response.data).length).toEqual(3);
            expect((response.data as any).mapName1).not.toBeUndefined();
            expect((response.data as any).mapName1).toEqual('mapValue1');
            expect((response.data as any).mapName2).not.toBeUndefined();
            expect((response.data as any).mapName2).toEqual('mapValue2');
            expect((response.data as any).test).not.toBeUndefined();
            expect((response.data as any).test).toEqual('param1');
            done();
          },
          error => errorFunc(error, done),
        );
      });
    });
  });
});
