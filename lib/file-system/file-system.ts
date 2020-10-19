import { readFile, writeFile, unlink, exists } from 'fs';
import { promisify } from 'util';
import { file } from 'find';

export class FileSystem {
  read(path: string): Promise<string> {
    return promisify(readFile)(path, { encoding: 'utf-8' });
  }

  write(path: string, data: string): Promise<void> {
    return promisify(writeFile)(path, data, { encoding: 'utf-8' });
  }

  delete(path: string): Promise<void> {
    return promisify(unlink)(path);
  }

  doesExist(path: string): Promise<boolean> {
    return promisify(exists)(path);
  }

  findFiles(pattern: string | RegExp, root: string): Promise<string[]> {
    return new Promise(resolve => {
      file(pattern, root, (files) => {
        resolve(files);
      });
    });
  }
}
