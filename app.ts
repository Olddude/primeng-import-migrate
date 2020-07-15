import { FileSystem, PrimengImportMigrator } from '.';

export class App {

  private readonly fs: FileSystem = new FileSystem();
  private readonly migrator: PrimengImportMigrator = new PrimengImportMigrator();

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
          .then(([file, fileContent]) => Promise.all([file, this.migrator.migrate(fileContent)]))
          .then(([file, migratedContent]) => this.fs.write(file, migratedContent).then(() => file))
          .then(file => this.fs.read(file).then(() => file))
          .then(file => console.log(`updated: ${file}`))
        )
      );
    });
  }

}
