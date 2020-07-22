#!/usr/bin/env node

import { program } from 'commander';
import { App } from './app';
import { resolve } from 'path';
import { cwd } from 'process';
import { Linebreak, Quotemark } from './lib/module-import-options';

function parseRegExp(value: string): RegExp {
  return new RegExp(value);
}

function parsePath(value: string): string {
  return resolve(cwd(), value);
}

function parseLinebreak(value: string): Linebreak {
  return Linebreak[value.toUpperCase()];
}

function parseQuotemark(value: string): Quotemark {
  return Quotemark[value.toUpperCase()];
}

function parseSemicolon(value: string): boolean {
  if (value === 'false' || value === '\'false\'' || value === '"false"') {
    return false;
  } else {
    return !!value;
  }
}

const DEFAULT_PATTERN = /\.ts$/g;
const DEFAULT_ROOT = cwd();
const DEFAULT_LINEBREAK = Linebreak.LF;
const DEFAULT_QUOTEMARK = Quotemark.SINGLE;
const DEFAULT_SEMICOLON = true;

program
  .option<RegExp>('-p, --pattern', `File search pattern (default: ${DEFAULT_PATTERN})`, parseRegExp)
  .option<string>('-r, --root', `Root directory (default: ${DEFAULT_ROOT})`, parsePath)
  .option<Linebreak>('-l, --linebreak', 'Linebreak: crlf or lf (default: lf)', parseLinebreak)
  .option<Quotemark>('-q, --quotemark', 'Quotemark: single or double (default: single)', parseQuotemark)
  .option<boolean>('-s, --semicolon <boolean>', 'Semicolon: true of false (default: true)', parseSemicolon)
  .parse(process.argv);

const pattern = program.pattern || DEFAULT_PATTERN;
const root = program.root || DEFAULT_ROOT;
const linebreak = program.linebreak || DEFAULT_LINEBREAK;
const quotemark = program.quotemark || DEFAULT_QUOTEMARK;
const semicolon = program.semicolon || DEFAULT_SEMICOLON;

App.init({ pattern, root, linebreak, quotemark, semicolon }).run();
