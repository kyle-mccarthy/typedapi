import { Token } from 'typedi';
import { Connection } from 'typeorm';
import Koa from 'koa';
import AppConfig from '@src/lib/AppConfig';

export const CacheService = new Token<Cache>();
export interface Cache {
  get(key: string): Promise<any>;
  set(key: string, value: any): Promise<any>;
  del(key: string): Promise<any>;
}

export const LoggerService = new Token<Logger>();
export interface Logger {
  alert(message: any, label?: string): void;
  error(message: any, label?: string): void;
  warn(message: any, label?: string): void;
  notice(message: any, label?: string): void;
  info(message: any, label?: string): void;
  debug(message: any, label?: string): void;
}

export const ConnectionToken = new Token<Connection>();
export interface DbConfig {
  type: string;
  host: string;
  username: string;
  password: string;
  database: string;
  port: number;
}

export const ServerToken = new Token<Koa>();
export interface ServerConfig {
  port: number;
}

export const AppConfigService = new Token<AppConfig>();

export interface RedisConfig {
  host: string;
  port: number;
}
