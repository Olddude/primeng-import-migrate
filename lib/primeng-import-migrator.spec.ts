import { PrimengImportMigrator } from './primeng-import-migrator';

describe('PrimengImportMigrator', () => {

  let sut: PrimengImportMigrator;

  beforeEach(() => {
    sut = new PrimengImportMigrator();
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });

  it('should return an empty array if no matches are found', async () => {
    const fileContent = `import {
      RouterModule,
      Routes
    } from '@angular/router';`;
    const actual = await sut.allPrimengImports(fileContent);
    const expected = [];
    expect(actual).toEqual(expected);
  });

  it('should find all mixed primeng imports', async () => {
    const fileContent = `import {
  RouterModule,
  Routes
} from '@angular/router';
import { SharedModule } from '../shared/components/shared.module';
import {
  TreeModule,
  ToggleButtonModule
} from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { TableModule } from 'primeng/primeng';
import { AdministrationGuard } from './guards/administration.guard';
import { AdministrationService } from './services/administration.service';`;
    const actual = await sut.allPrimengImports(fileContent);
    const expected = [
      `import {
  TreeModule,
  ToggleButtonModule
} from 'primeng/primeng';`,
      'import { ButtonModule } from \'primeng/primeng\';',
      'import { TableModule } from \'primeng/primeng\';'
    ];
    expect(actual).toEqual(expected);
  });

});
