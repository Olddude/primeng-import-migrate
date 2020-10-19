import { ScssPTableMigrator } from './scss-p-table-migrator';
import { pTableStub } from './stubs/p-table.stub';

describe('ScssPTableMigrator', () => {

  let sut: ScssPTableMigrator;

  beforeEach(() => {
    sut = new ScssPTableMigrator();
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });

  it('should migrate', () => {
    const expected = `::ng-deep .p-table {
  .p-table-header {
    display: flex;
  }
};`;
    const actual = sut.migrate(pTableStub);
    expect(actual).toEqual(expected);
  });

});
