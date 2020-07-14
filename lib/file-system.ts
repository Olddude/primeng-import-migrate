import { readFile } from 'fs';
import { promisify } from 'util';

export class FileSystem {
  read(path: string): Promise<string> {
    return promisify(readFile)(path, { encoding: 'utf-8' });
  }
}
