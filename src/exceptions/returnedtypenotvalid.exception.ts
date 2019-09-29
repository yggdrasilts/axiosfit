/**
 * Returned type exception.
 */
export class ReturnedTypeNotValidException extends Error {
  constructor() {
    super('Service has a not valid returned type. Valid types are: [Observable<AxiosResponse<T>>, Promise<AxiosResponse<T>>]');
    this.name = ReturnedTypeNotValidException.name;
  }
}
