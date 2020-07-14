export class PrimengImportMigrator {

  migrate(fileContent: string): string {
    const importStatements = this.allImportStatements(fileContent);
    const newFileContent = importStatements.reduce((source, statement) => {
      const imports = this.extractImports(statement);
      const migratedStatement = this.buildMigratedImportStatement(imports);
      return source.replace(statement, migratedStatement);
    }, fileContent);
    return newFileContent;
  }

  allImportStatements(fileContent: string): string[] {
    const regex = /(import.*{.*}.*primeng\/primeng.*)|(import.*{[\w+|\s+\\,(\\r\\n|\\n)]{1,}}.*primeng\/primeng.*)/g;
    const result = fileContent.match(regex);
    return result || [];
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
