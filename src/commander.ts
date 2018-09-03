import commander from 'commander';
import GenerateKeys from '@src/commands/GenerateKeys';

commander
  .command('generate:keys', 'Generate the private and public RSA keys for authorization')
  .action(async (args: any[]) => {
    const cmd = await new GenerateKeys();
    cmd.run(args);
  });

commander.parse(process.argv);
