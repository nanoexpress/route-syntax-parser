export default function functionToString(
  func: (...args: never[]) => never
): string {
  return func.toString().trim();
}
