import { MatchFinder } from '../match-finder/match-finder';
import { Migrator } from '../migrator';

export class PrimengImportMigrator implements Migrator {

  private readonly matchFinder = new MatchFinder();


  migrate(fileContent: string): string {
    const importStatements = this.matchFinder.find(
      fileContent,
      /(import.*{.*}.*primeng\/primeng.*)|(import.*{[\w+|\s+\\,(\\r\\n|\\n)]{1,}}.*primeng\/primeng.*)/g
    );
    const newFileContent = importStatements.reduce((source, statement) => {
      const imports = this.extractImports(statement);
      const migratedStatement = this.buildMigratedImportStatement(imports);
      return source.replace(statement, migratedStatement);
    }, fileContent);
    return newFileContent;
  }

  extractImports(importStatement: string): string[] {
    return importStatement
      .split('{')[1]
      .split('}')[0]
      .replace(/\s+/g, '')
      .split(',')
      .filter(_ => _ !== undefined && _ !== '');
  }

  buildMigratedImportStatement(imports: string[]): string {
    return imports.reduce((migratedStatement, module, index, array) => {
      const moduleName = module.toLowerCase().replace('module', '');
      const moduleNamespace = `primeng/${moduleName}`;
      migratedStatement += `import { ${module} } from '${moduleNamespace}';`;
      if (index < array.length -1) { migratedStatement += '\n'; }
      return migratedStatement;
    }, '');
  }

}
