import { DbConfig, ServerConfig, AppConfigService, RedisConfig } from '@src/types';
import { join } from 'path';
import { Service } from 'typedi';
import DbSettings from '@src/config/db.json';
import ServerSettings from '@src/config/server.json';
import { BASE_DIR } from '@src/index';

@Service(AppConfigService)
export default class AppConfig {
  private dbConfig!: DbConfig;
  private serverConfig!: ServerConfig;
  private redisConfig!: RedisConfig;

  constructor() {
    this.loadConfigFiles();
  }

  baseDir(): string {
    return BASE_DIR;
  }

  appDir(): string {
    return join(this.baseDir(), './src');
  }

  runtimeDir(): string {
    return join(this.baseDir(), './runtime');
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

  private loadConfigFiles() {
    this.dbConfig = DbSettings.sql;
    this.redisConfig = DbSettings.redis;

    this.serverConfig = ServerSettings;
  }
}
