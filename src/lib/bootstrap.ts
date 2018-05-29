import AppConfig from '@src/lib/AppConfig';
import { ConnectionToken, LoggerService, ServerToken, AppConfigService, CacheService } from '@src/types';
import { mkdirSync, statSync } from 'fs';
import Koa from 'koa';
import { join } from 'path';
import { useContainer as routingUseContainer, useKoaServer } from 'routing-controllers';
import { Container } from 'typedi';
import { Connection, createConnection, useContainer as ormUseContainer } from 'typeorm';
import entities from '@src/entities';
import koaBodyparser from 'koa-bodyparser';
import WinstonLogger from '@src/lib/logger/WinstonLogger';
import RedisCache from '@src/lib/cache/RedisCache';

export const bootstrap = async (): Promise<Koa> => {
  const appConfig = new AppConfig();
  Container.set(AppConfigService, appConfig);

  mkdirIfNotExists(appConfig.runtimeDir());
  mkdirIfNotExists(join(appConfig.runtimeDir(), './logs'));

  const connection = await initDatabase();
  Container.set(ConnectionToken, connection);

  routingUseContainer(Container);
  ormUseContainer(Container);

  const app = bootstrapServer();
  Container.set(ServerToken, app);

  const logger = new WinstonLogger();
  Container.set(LoggerService, logger);

  const cache = new RedisCache();
  Container.set(CacheService, cache);

  app.listen(appConfig.port(), () => {
    logger.info(`> Ready on http://localhost:${appConfig.port()}`);
  });

  return app;
};

export const initDatabase = async (useTestDb: boolean = false): Promise<Connection> => {
  const appConfig = Container.get(AppConfigService);
  const { host, port, database } = appConfig.getDbConfig();

  if (useTestDb) {
    return createConnection({
      entities,
      type: 'sqljs',
      dropSchema: true,
      synchronize: true,
    });
  }

  return createConnection({
    entities,
    host,
    port,
    database,
    type: 'postgres',
    synchronize: true,
  });
};

export const bootstrapServer = (): Koa => {
  const config = Container.get(AppConfigService);
  const app = new Koa();

  app.use(koaBodyparser());

  useKoaServer(app, {
    routePrefix: '/api',
    controllers: [join(config.appDir(), '/controllers/**/*.ts')],
    defaults: {
      nullResultCode: 404,
      undefinedResultCode: 204,
    },
  });

  return app;
};

const mkdirIfNotExists = (dir: string) => {
  try {
    statSync(dir);
  } catch (e) {
    mkdirSync(dir);
  }
};

export default bootstrap;
