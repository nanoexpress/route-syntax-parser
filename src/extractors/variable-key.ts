export default function variableKeyExtractor(line: string): string[] | null {
  const matcRegEx = /(const|let|var)(.*)=(.*)?;/;
  const matches = line.match(matcRegEx);

  if (matches) {
    return matches.map((m) => m.trim()).slice(1);
  }

  return null;
}
