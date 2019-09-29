import { Axiosfit } from '../src';

import { TestService } from './services/TestService';
import { ReturnedTypeNotValidException } from '../src/exceptions';

describe('Testing Methods errors', () => {
  describe('TestService', () => {
    const testService = new Axiosfit<TestService>().baseUrl(process.env.MOCK_SERVER_URL).create(TestService);

    describe('GET methods', () => {
      it('Throws ReturnedTypeNotValidException', () => {
        try {
          testService.performGetRequest();
          fail();
        } catch (error) {
          expect(error).not.toBeNull();
          expect(error).toBeInstanceOf(ReturnedTypeNotValidException);
          expect(error.name).toEqual(ReturnedTypeNotValidException.name);
          expect(error.message).toEqual(
            'Service has a not valid returned type. Valid types are: [Observable<AxiosResponse<T>>, Promise<AxiosResponse<T>>]',
          );
        }
      });
    });
  });
});
