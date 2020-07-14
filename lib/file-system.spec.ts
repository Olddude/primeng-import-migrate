import { FileSystem } from './file-system';
import { resolve } from 'path';

describe('FileSystem', () => {

  let sut: FileSystem;

  beforeEach(() => {
    sut = new FileSystem();
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });

  it('should read file', async () => {
    const path = resolve(__dirname, './file-system.ts');
    const actual = await sut.read(path);
    const expected = 'FileSystem';
    expect(actual).toContain(expected);
  });

});
