import { PrimengImportMigrator } from './primeng-import-migrator';
import { noPrimengFileContentStub } from './stubs/no-primeng-file-content.stub';
import { allImportsFileContentStub } from './stubs/all-imports-file-content.stub';
import { clusteredImportStub } from './stubs/clustered-import.stub';
import { moduleImportsStub } from './stubs/module-imports.stub';

describe('PrimengImportMigrator', () => {

  let sut: PrimengImportMigrator;

  beforeEach(() => {
    sut = new PrimengImportMigrator();
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });

  it('should return an empty array if no matches are found', () => {
    const actual = sut.allImportStatements(noPrimengFileContentStub);
    const expected = [];
    expect(actual).toEqual(expected);
  });

  it('should find all primeng import statements', () => {
    const actual = sut.allImportStatements(allImportsFileContentStub);
    const expected = [
      `import {
  TreeModule,
  ToggleButtonModule,
  ButtonModule, InputTextModule
} from 'primeng/primeng';`,
      'import { ButtonModule } from \'primeng/primeng\';',
      'import { TableModule } from \'primeng/primeng\';'
    ];
    expect(actual).toEqual(expected);
  });

  it('should extract imports from import match', () => {
    const actual = sut.extractImports(clusteredImportStub);
    const expected = [
      'TreeModule',
      'ToggleButtonModule',
      'ButtonModule',
      'InputTextModule'
    ];
    expect(actual).toEqual(expected);
  });

  it('should build migrated import statement from module imports', () => {
    const actual = sut.buildMigratedImportStatement(moduleImportsStub);
    const expected = `import { TreeModule } from 'primeng/tree';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
`;
    expect(actual).toEqual(expected);
  });

});
