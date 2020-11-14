import { RPCError } from './errors';

export interface ResponseContainer<T> {
  error?: RPCError;
  value?: T;
}

export interface RequestContainer<T> {
  contractVersion: string;
  arg: T;
}
