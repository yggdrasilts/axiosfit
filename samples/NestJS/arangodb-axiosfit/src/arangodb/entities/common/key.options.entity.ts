import { KeyType } from './key.type.enum';

export interface KeyOptions {
  allowUserKeys: boolean;
  type: KeyType;
  increment: number;
  offset: number;
}
