export class PrimengImportMigrator {

  async allPrimengImports(input: string): Promise<RegExpMatchArray> {
    const regex = /(import.*{.*}.*primeng\/primeng.*)|(import.*{[\w+|\s+\\,(\\r\\n|\\n)]{1,}}.*primeng\/primeng.*)/g;
    const result = input.match(regex);
    return result || [];
  }

}
