import { FileSystem, PrimengImportMigrator } from '.';
import { ModuleImportOptions } from './lib/module-import-options';

export class App {

  private readonly fs: FileSystem = new FileSystem();
  private readonly migrator: PrimengImportMigrator = new PrimengImportMigrator();

  private constructor(
    private readonly options: ModuleImportOptions
  ) { }

  public static init(options: ModuleImportOptions): App {
    return new App(options);
  }

  run(): Promise<void[]> {
    return this.fs.findFiles(this.options.pattern, this.options.root).then(files => {
      return Promise.all(
        files.map(file => Promise.all([file, this.fs.read(file)])
          .then(([file, original]) => Promise.all([file, this.migrator.migrate(original, this.options)]))
          .then(([file, migrated]) => this.fs.write(file, migrated).then(() => file))
          .then(file => this.fs.read(file).then(() => file))
          .then(file => console.log(`[INFO] | successfully updated file: ${file}`))
        )
      );
    });
  }

}
