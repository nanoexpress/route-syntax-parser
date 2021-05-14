export default function variableKeyExtractor(line) {
  const matcRegEx = /(const|let|var)(.*)=(.*)/;
  const matches = line.match(matcRegEx);

  if (matches) {
    return matches.map((m) => m.trim()).slice(1);
  }

  return null;
}
