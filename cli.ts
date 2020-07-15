#!/usr/bin/env node

import { program } from 'commander';
import { App } from './app';

program
  .requiredOption('--pattern <string>', 'File search pattern')
  .requiredOption('--root <string>', 'Root directory')
  .parse(process.argv);

App.init(program.pattern, program.root).run();
