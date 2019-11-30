import { Axiosfit, isObservable } from '../src';

import { TestService } from './services/TestService';

describe('Testing Methods errors', () => {
  describe('TestService', () => {
    const testService = new Axiosfit<TestService>().baseUrl(process.env.MOCK_SERVER_URL).create(TestService);

    describe('GET methods', () => {
      it('Not a valid Axiosfit', () => {
        const response = testService.performGetRequest();
        expect(isObservable(response)).toBeTruthy();
        expect(response.data).toBeUndefined();
      });
    });
  });
});
