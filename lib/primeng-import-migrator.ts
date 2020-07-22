import { ModuleImportOptions } from './module-import-options';

export class PrimengImportMigrator {

  migrate(sourceFileContent: string, options: ModuleImportOptions): string {
    const importStatements = this.extractModuleImportStatements(sourceFileContent);
    const targetFileContent = importStatements.reduce((source, original) => {
      const importedModules = this.extractImportedModules(original);
      const migrated = this.migrateImportStatements(importedModules, options);
      return source.replace(original, migrated);
    }, sourceFileContent);
    return targetFileContent;
  }

  extractModuleImportStatements(fileContent: string): string[] {
    const regex = /(import.*{.*}.*primeng\/primeng.*)|(import.*{[\w+|\s+,(\r\n|\n)]{1,}}.*primeng\/primeng.*)/g;
    const result = fileContent.match(regex);
    return result || [];
  }

  extractImportedModules(moduleImportStatement: string): string[] {
    return moduleImportStatement
      .split('{')[1]
      .split('}')[0]
      .replace(/\s+/g, '')
      .split(',')
      .filter(_ => _ !== undefined && _ !== '');
  }

  migrateImportStatements(importedModules: string[], options: ModuleImportOptions): string {
    return importedModules.reduce((migratedStatement, module, index, array) => {
      const moduleName = module.toLowerCase().replace('module', '');
      const moduleNamespace = `primeng/${moduleName}`;
      migratedStatement += `import { ${module} } from `;
      migratedStatement += `${options.quotemark}${moduleNamespace}${options.quotemark}`;
      if (options.semicolon) {
        migratedStatement += ';';
      }
      if (index < array.length -1) {
        migratedStatement += options.linebreak;
      }
      return migratedStatement;
    }, '');
  }

}
