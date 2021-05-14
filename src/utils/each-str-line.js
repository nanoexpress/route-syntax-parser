import stringSplit from './string-split.js';

export default function eachStringLine(str, map) {
  const tree = stringSplit(str);
  tree.forEach((codeline, index) => {
    if (codeline.length > 0) {
      map(codeline, index);
    }
  });
}
