import AppConfig from '@src/lib/AppConfig';
import prettyPrint from '@src/services/logger/formats/prettyPrint';
import { AppConfigService } from '@src/types';
import { ILoggerService, LoggerService } from '@src/services/logger/ILoggerService';
import { join } from 'path';
import { Container, Service } from 'typedi';
import { Logger as UseLogger, createLogger, format, transports } from 'winston';

@Service(LoggerService)
export default class WinstonLogger implements ILoggerService {
  private config: AppConfig;
  private logger: UseLogger;

  constructor() {
    this.config = Container.get(AppConfigService);

    this.logger = createLogger({
      level: 'debug',
      format: format.combine(format.timestamp(), format.json()),
      transports: [
        new transports.File({ filename: join(this.config.runtimeDir(), './logs/error.log'), level: 'error ' }),
        new transports.File({ filename: join(this.config.runtimeDir(), './logs/app.log') }),
      ],
    });

    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(new transports.Console({
        format: prettyPrint,
      }));
    }
  }

  public alert(message: any, label?: string) {
    this.logger.alert(message, {
      label,
    });
  }

  public error(message: any, label?: string) {
    this.logger.error(message, {
      label,
    });
  }

  public warn(message: any, label?: string) {
    this.logger.warning(message, {
      label,
    });
  }

  public notice(message: any, label?: string) {
    this.logger.notice(message, {
      label,
    });
  }

  public info(message: any, label?: string) {
    this.logger.info(message, {
      label,
    });
  }

  public debug(message: any, label?: string) {
    this.logger.debug(message, {
      label,
    });
  }
}
