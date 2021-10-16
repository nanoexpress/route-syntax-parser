export default function babelCompilerManipulationNormalize(
  content: string
): string {
  if (content.includes('const {\n') || content.includes('let {\n')) {
    return content.split('\n').reduce((all, currLine) => {
      currLine = currLine.trim();
      if (currLine.includes('//')) {
        return `${all}\n${currLine}`;
      }
      if (currLine.includes('const') || currLine.includes('let')) {
        currLine = `\n${currLine}`;
      } else if (currLine.includes(';}')) {
        currLine = ';\n}';
      }
      return all + currLine;
    }, '');
  }
  return content;
}
