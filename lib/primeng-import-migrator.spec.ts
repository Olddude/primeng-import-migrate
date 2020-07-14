import { PrimengImportMigrator } from './primeng-import-migrator';
import { FileSystem } from './file-system';
import { resolve } from 'path';

describe('PrimengImportMigrator', () => {

  let sut: PrimengImportMigrator;
  let fileSystem: FileSystem;

  beforeEach(() => {
    sut = new PrimengImportMigrator();
    fileSystem = new FileSystem();
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });

  it('should find all seperate primeng import statements', async () => {
    const inputFilePath = resolve(__dirname, '../test-files/seperated-imports/actual.ts');
    const inputFileContent = await fileSystem.read(inputFilePath);
    const primengImports = await sut.allPrimengImports(inputFileContent);
    expect(primengImports.length).toEqual(15);
  });

  it('should find all clustered primeng import statements', async () => {
    const inputFilePath = resolve(__dirname, '../test-files/clustered-imports/actual.ts');
    const inputFileContent = await fileSystem.read(inputFilePath);
    const primengImports = await sut.allPrimengImports(inputFileContent);
    expect(primengImports.length).toEqual(1);
  });

  it('should find all mixed primeng imports', async () => {
    const inputFilePath = resolve(__dirname, '../test-files/mixed-imports/actual.ts');
    const inputFileContent = await fileSystem.read(inputFilePath);
    const primengImports = await sut.allPrimengImports(inputFileContent);
    expect(primengImports.length).toEqual(3);
  });

});
