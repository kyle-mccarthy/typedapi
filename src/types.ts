
import { Connection } from 'typeorm';
import Koa from 'koa';
export * from '@src/lib/AppConfig';
export * from '@src/services/cache/ICacheService';
export * from '@src/services/logger/ILoggerService';
import { Token } from 'typedi';

export enum Env {
  IS_DEV = 'IS_DEV',
  IS_TEST = 'IS_TEST',
  IS_PROD = 'IS_PROD',
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

export interface RedisConfig {
  host: string;
  port: number;
}

export interface ICommand {
  run(args?: any[]): void;
}
