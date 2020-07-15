#!/usr/bin/env node

import { program } from 'commander';
import { App } from './app';
import { resolve } from 'path';

function parseRegExp(value: string): RegExp {
  return new RegExp(value);
}

function parsePath(value: string): string {
  return resolve(process.cwd(), value);
}

program
  .requiredOption<RegExp>('--pattern <string>', 'File search pattern', parseRegExp)
  .requiredOption<string>('--root <string>', 'Root directory', parsePath)
  .parse(process.argv);

App.init(program.pattern, program.root).run();
