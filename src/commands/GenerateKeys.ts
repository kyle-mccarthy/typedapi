
import AbstractCommand from '@src/commands/AbstractCommand';
import { mkdirIfNotExists } from '@src/lib/bootstrap';
import { AppConfigService } from '@src/types';
import { Inject } from 'typedi';
import AppConfig from '@src/lib/AppConfig';
import NodeRSA from 'node-rsa';

class GenerateKeys extends AbstractCommand {
  @Inject(AppConfigService) public config!: AppConfig;

  public async run(args?: any[]) {
    mkdirIfNotExists(this.config.runtimeDir('keys'));
    const key = (new NodeRSA()).generateKeyPair(4096);
    console.log(key);

  }
}

export default GenerateKeys;
