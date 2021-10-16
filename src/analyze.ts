import caseRequestModeFinder from './finders/request';
import { IBlock } from './types/interfaces';
import babelCompilerManipulationNormalize from './utils/babel-normalise';
import eachStringLine from './utils/each-str-line';
import functionToString from './utils/fn-to-string';

export default function analyze(func: (...args: never[]) => never): IBlock[] {
  const blocks: IBlock[] = [];
  eachStringLine(
    babelCompilerManipulationNormalize(functionToString(func)),
    (line, index) => {
      const caseFinder = caseRequestModeFinder(line, index);

      if (caseFinder) {
        blocks.push(caseFinder);
      }
    }
  );

  return blocks;
}
