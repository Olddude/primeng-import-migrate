export class MatchFinder {
  find(fileContent: string, expression: RegExp): RegExpMatchArray {
    return fileContent.match(expression) || [];
  }
}
