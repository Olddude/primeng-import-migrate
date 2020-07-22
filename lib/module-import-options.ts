export enum Quotemark {
  SINGLE = '\'',
  DOUBLE = '"'
}

export enum Linebreak {
  CRLF  = '\r\n',
  LF    = '\n'
}

export interface ModuleImportOptions {
  readonly pattern: string | RegExp;
  readonly root: string;
  readonly quotemark: Quotemark;
  readonly linebreak: Linebreak;
  readonly semicolon: boolean;
}
