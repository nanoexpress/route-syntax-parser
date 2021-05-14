import caseRequestModeFinder from './finders/request/index.js';
import babelCompilerManipulationNormalize from './utils/babel-normalise.js';
import eachStringLine from './utils/each-str-line.js';
import functionToString from './utils/fn-to-string.js';

export default function analyze(func) {
  const blocks = [];
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
