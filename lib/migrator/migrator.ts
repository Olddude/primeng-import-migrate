export interface Migrator {
  migrate(fileContent: string): string;
}
