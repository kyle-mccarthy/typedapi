import { DbConfig, ServerConfig, RedisConfig } from '@src/types';
import { join } from 'path';
import { Service } from 'typedi';
import DbSettings from '@src/config/db.json';
import ServerSettings from '@src/config/server.json';
import { BASE_DIR } from '@src/index';
import { Token } from 'typedi';

export const AppConfigService = new Token<AppConfig>();

@Service(AppConfigService)
export default class AppConfig {
  private dbConfig: DbConfig;
  private serverConfig: ServerConfig;
  private redisConfig: RedisConfig;

  constructor() {
    this.dbConfig = DbSettings.sql;
    this.redisConfig = DbSettings.redis;
    this.serverConfig = ServerSettings;
  }

  baseDir(): string {
    return BASE_DIR;
  }

  appDir(): string {
    return join(this.baseDir());
  }

  runtimeDir(path?: string): string {
    return join(this.baseDir(), './runtime', path ? path : '');
  }

  port(): number {
    if (process.env.PORT) {
      return Number(process.env.PORT);
    }
    return this.getServerConfig().port ? this.getServerConfig().port : 3000;
  }

  getDbConfig(): DbConfig {
    return this.dbConfig;
  }

  getServerConfig(): ServerConfig {
    return this.serverConfig;
  }

  getRedisConfig(): RedisConfig {
    return this.redisConfig;
  }

}
