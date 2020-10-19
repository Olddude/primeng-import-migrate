import { file } from 'find';
import { Migrator } from '..';
import { MatchFinder } from '../match-finder/match-finder';

export class ScssPTableMigrator implements Migrator {

  private readonly matchFinder = new MatchFinder();

  migrate(fileContent: string): string {
    const matches = this.matchFinder.find(
      fileContent,
      /.ui-table/g
    );
    const newFileContent = matches.reduce((source, statement) => {
      return source.replace(statement, '.p-table');
    }, fileContent);
    return newFileContent;
  }

}
