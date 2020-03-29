/**
 * Interface to match parameters for sending requests.
 */
export interface IParam {
  name: string;
  index: number;
}

export interface IParamMap {
  [key: string]: string;
}

export interface IHeadersMap {
  [key: string]: string;
}
