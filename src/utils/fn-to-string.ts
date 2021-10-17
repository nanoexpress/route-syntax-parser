export default function functionToString<T>(func: T): string {
  return (func as any).toString().trim();
}
