import { ScssPTableMigrator } from './scss-p-table-migrator';

describe('ScssPTableMigrator', () => {

  let sut: ScssPTableMigrator;

  beforeEach(() => {
    sut = new ScssPTableMigrator();
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });

});
