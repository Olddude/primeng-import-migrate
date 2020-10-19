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

  it('should write data to file and delete it afterwards', async () => {
    const path = resolve(__dirname, './deleteme.txt');
    const data = `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident,
sunt in culpa qui officia deserunt mollit anim id est laborum.`;
    await sut.write(path, data);
    expect(await sut.doesExist(path)).toBe(true);
    await sut.delete(path);
    expect(await sut.doesExist(path)).toBe(false);
  });

  it('should find all files with matching pattern', async () => {
    const root = resolve(__dirname, '.');
    const files = await sut.findFiles(/.ts/, root);
    expect(files.length > 0).toBe(true);
  });

  it('should not find any files if pattern does not match', async () => {
    const root = resolve(__dirname, '.');
    const files = await sut.findFiles(/.exe/, root);
    expect(files.length === 0).toBe(true);
  });

});
