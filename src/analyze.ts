import { IBlock } from '../types/interfaces';
import caseRequestModeFinder from './finders/request';
import babelCompilerManipulationNormalize from './utils/babel-normalise';
import eachStringLine from './utils/each-str-line';
import functionToString from './utils/fn-to-string';
import stringSplit from './utils/string-split';

function analyze<T>(func: T): IBlock[] {
  const blocks: IBlock[] = [];
  eachStringLine(
    babelCompilerManipulationNormalize(functionToString<T>(func)),
    (line, index) => {
      const caseFinder = caseRequestModeFinder(line, index);

      if (caseFinder) {
        blocks.push(caseFinder);
      }
    }
  );

  return blocks;
}
export {
  analyze as default,
  eachStringLine,
  babelCompilerManipulationNormalize,
  functionToString,
  stringSplit
};
