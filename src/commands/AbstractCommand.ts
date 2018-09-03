import { ICommand } from '@src/types';
import { register } from '@src/lib/bootstrap';

abstract class AbstractCommand implements ICommand {
  constructor() {
    register();
  }

  abstract run(args?: any[]): void | Promise<void>;
}

export default AbstractCommand;
