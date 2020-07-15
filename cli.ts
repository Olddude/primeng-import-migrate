import { program } from 'commander';
import { App } from './app';
import { resolve } from 'path';

function parseRegExp(value: string): RegExp {
  return new RegExp(value);
}

function parsePath(value: string): string {
  return resolve(__dirname, value);
}

program
  .requiredOption<RegExp>('--pattern <string>', 'File search pattern', parseRegExp)
  .requiredOption<string>('--root <string>', 'Root directory', parsePath)
  .parse(process.argv);

async function main(): Promise<void> {
  await App.init(program.pattern, program.root).run();
}

main();
