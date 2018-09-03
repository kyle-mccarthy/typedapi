import { Token } from 'typedi';

export const CacheService = new Token<ICacheService>();

export interface ICacheService {
  get(key: string): Promise<any>;
  set(key: string, value: any): Promise<any>;
  del(key: string): Promise<any>;
}
