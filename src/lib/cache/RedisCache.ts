import AppConfig from '@src/lib/AppConfig';
import { Cache } from '@src/types';
import { RedisClient, createClient } from 'redis';
import { Container, Service } from 'typedi';
import { promisify } from 'util';
import { AppConfigService, CacheService } from '@src/types';

@Service(CacheService)
export default class RedisCache implements Cache {
  private config: AppConfig;
  private client: RedisClient;
  private _get: (key: string) => Promise<string>;
  private _set: (key: string, val: string) => Promise<any>;
  private _del: (key: string) => Promise<any>;

  constructor() {
    this.config = Container.get(AppConfigService);
    const { host, port } = this.config.getRedisConfig();
    this.client = createClient(port, host);
    this._get = promisify(this.client.get).bind(this.client);
    this._set = promisify(this.client.set).bind(this.client);
    this._del = promisify(this.client.del).bind(this.client);
  }

  public get(key: string): Promise<string> {
    return this._get(key);
  }

  public set(key: string, val: string): Promise<any> {
    return this._set(key, val);
  }

  public del(key: string): Promise<any> {
    return this._del(key);
  }
}
