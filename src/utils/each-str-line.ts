import stringSplit from './string-split';

export default function eachStringLine(
  str: string,
  map: (codeline: string, index: number) => void
): void {
  const tree = stringSplit(str);
  tree.forEach((codeline: string, index: number) => {
    if (codeline.length > 0) {
      map(codeline, index);
    }
  });
}
