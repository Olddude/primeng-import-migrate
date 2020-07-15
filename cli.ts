#!/usr/bin/env node

import { program } from 'commander';
import { App } from './app';
import { resolve } from 'path';

function parseRegExp(value) {
  return new RegExp(value);
}

function parsePath(value) {
  return resolve(__dirname, value);
}

program
  .requiredOption('--pattern <string>', 'File search pattern', parseRegExp)
  .requiredOption('--root <string>', 'Root directory', parsePath)
  .parse(process.argv);

App.init(program.pattern, program.root).run();
