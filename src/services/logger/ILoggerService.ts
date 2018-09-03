import { Token } from 'typedi';

export const LoggerService = new Token<ILoggerService>();

export interface ILoggerService {
  alert(message: any, label?: string): void;
  error(message: any, label?: string): void;
  warn(message: any, label?: string): void;
  notice(message: any, label?: string): void;
  info(message: any, label?: string): void;
  debug(message: any, label?: string): void;
}
