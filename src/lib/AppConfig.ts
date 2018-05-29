import { DbConfig, ServerConfig, AppConfigService, RedisConfig } from '@src/types';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Service } from 'typedi';

@Service(AppConfigService)
export default class AppConfig {
  private dbConfig!: DbConfig;
  private serverConfig!: ServerConfig;
  private redisConfig!: RedisConfig;

  constructor() {
    this.loadConfigFiles();
  }

  baseDir(): string {
    return join(__dirname, './../../');
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
    const db = JSON.parse(readFileSync(join(this.appDir(), './config/db.json')).toString());
    this.dbConfig = db.sql;
    this.redisConfig = db.redis;

    const server = JSON.parse(readFileSync(join(this.appDir(), './config/server.json')).toString());
    this.serverConfig = server;
  }
}
