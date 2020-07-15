import { program } from 'commander';
import { App } from './app';

program
  .requiredOption('-p', '--pattern <string | RegExp>', 'File search pattern')
  .requiredOption('-r', '--root <string>', 'Root directory')
  .parse(process.argv);

async function main(): Promise<void> {
  await App.init(program.pattern, program.root).run();
}

main();
