import { PrimengImportMigrator } from './primeng-import-migrator';
import { noPrimengFileContentStub } from './stubs/no-primeng-file-content.stub';
import { allImportsFileContentStub } from './stubs/all-imports-file-content.stub';
import { clusteredImportStub } from './stubs/clustered-import.stub';
import { moduleImportsStub } from './stubs/module-imports.stub';
import { ModuleImportOptions, Linebreak, Quotemark } from './module-import-options';

describe('PrimengImportMigrator', () => {
  let sut: PrimengImportMigrator;

  beforeEach(() => {
    sut = new PrimengImportMigrator();
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });

  describe('extractModuleImportStatements', () => {
    it('should return an empty array if no matches are found', () => {
      const actual = sut.extractModuleImportStatements(noPrimengFileContentStub);
      const expected = [];
      expect(actual).toEqual(expected);
    });

    it('should find all primeng import statements', () => {
      const actual = sut.extractModuleImportStatements(allImportsFileContentStub);
      const expected = [`import {
  TreeModule,
  ToggleButtonModule,
  ButtonModule, InputTextModule
} from 'primeng/primeng';`,
      'import { ButtonModule } from \'primeng/primeng\';',
      'import { TableModule } from \'primeng/primeng\';'
      ];
      expect(actual[0]).toEqual(expected[0].trimLeft().trimRight());
    });
  });

  describe('extractImportedModules', () => {
    it('should return an array of imported primeng modules', () => {
      const actual = sut.extractImportedModules(clusteredImportStub);
      const expected = [
        'TreeModule',
        'ToggleButtonModule',
        'ButtonModule',
        'InputTextModule'
      ];
      expect(actual).toEqual(expected);
    });
  });

  describe('migrateImportStatements', () => {
    it('should return a single migrated primeng modules import statement excluding other imports', () => {
      const options: ModuleImportOptions = {
        linebreak: Linebreak.LF,
        quotemark: Quotemark.SINGLE,
        semicolon: true
      };
      const actual = sut.migrateImportStatements(moduleImportsStub, options);
      const expected = `import { TreeModule } from 'primeng/tree';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';`;
      expect(actual).toEqual(expected);
    });
  });

  describe('migrate', () => {
    it('should return a string containing migrated module statements', () => {
      const options: ModuleImportOptions = {
        linebreak: Linebreak.LF,
        quotemark: Quotemark.SINGLE,
        semicolon: true
      };
      const actual = sut.migrate(allImportsFileContentStub, options);
      const expected = `import {
  RouterModule,
  Routes
} from '@angular/router';
import { SharedModule } from '../shared/components/shared.module';
import { TreeModule } from 'primeng/tree';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { AdministrationGuard } from './guards/administration.guard';
import { AdministrationService } from './services/administration.service';`;
      expect(actual).toEqual(expected);
    });
  });
});
