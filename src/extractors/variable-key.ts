export default function variableKeyExtractor(line: string): string[] | null {
  const matchRegEx = /(const|let|var)(.*)=(.*)?;/;
  const matches = line.match(matchRegEx);

  if (matches) {
    return matches.map((m) => m.trim()).slice(1);
  }

  return null;
}
