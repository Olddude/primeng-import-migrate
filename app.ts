import { FileSystem, PrimengImportMigrator } from '.';
import { Migrator } from './lib/migrator';
import { ScssPTableMigrator } from './lib/scss-p-table-migrator';

export class App {

  private readonly fs: FileSystem = new FileSystem();
  private readonly migrator: Migrator = new ScssPTableMigrator();

  private constructor(
    private readonly pattern: string | RegExp,
    private readonly root: string
  ) { }

  public static init(pattern: string | RegExp, root: string): App {
    return new App(pattern, root);
  }

  run(): Promise<void[]> {
    return this.fs.findFiles(this.pattern, this.root).then(files => {
      return Promise.all(
        files.map(file => Promise.all([file, this.fs.read(file)])
          .then(([file, original]) => Promise.all([file, this.migrator.migrate(original)]))
          .then(([file, migrated]) => this.fs.write(file, migrated).then(() => file))
          .then(file => this.fs.read(file).then(() => file))
          .then(file => console.log(`[INFO] | successfully updated file: ${file}`))
        )
      );
    });
  }

}
