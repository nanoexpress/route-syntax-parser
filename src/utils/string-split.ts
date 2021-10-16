export default function stringSplit(
  str: string,
  delimiter: '\n' | ' ' = '\n'
): string[] {
  return str.split(delimiter);
}
