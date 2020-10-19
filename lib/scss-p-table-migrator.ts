import { Migrator } from './migrator';

export class ScssPTableMigrator implements Migrator {

  migrate(fileContent: string): string {
    throw new Error(`method not implemented - ${fileContent}`);
  }

}
