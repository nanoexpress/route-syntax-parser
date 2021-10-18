import { BlockMode } from '../../types/interfaces';

export default (line: string): ['request' | 'req', BlockMode, string?] => {
  const matches = [];
  const cases = {
    SPACES: 0,
    SCOPE: 0,
    CURVE_SCOPE: 0,
    QUOTE: 0,
    TRAILING: 0,
    ENDLINES: 0,
    DOTS: 0,
    COMMAS: 0
  };
  const caseSum = (): number =>
    Object.values(cases).reduce((acc, n) => acc + n, 0);
  let pointer = 0;

  let rebuild = '';
  for (const char of line) {
    switch (char) {
      case '(': {
        cases.SCOPE++;

        rebuild += char;

        pointer++;
        break;
      }
      case "'":
      case '"': {
        cases.QUOTE++;

        rebuild += char;

        pointer++;
        break;
      }
      case '{': {
        cases.CURVE_SCOPE++;

        rebuild += char;

        pointer++;
        break;
      }
      case ')': {
        if (cases.SCOPE > 0) {
          cases.SCOPE++;
          rebuild += char;
        } else {
          // rebuild = '';
        }

        pointer++;
        break;
      }
      case '}': {
        if (cases.CURVE_SCOPE > 0) {
          cases.CURVE_SCOPE++;

          if (rebuild.length > 0) {
            matches.push(rebuild);
            rebuild = '';
          }
        }

        pointer++;
        break;
      }
      case ':':
      case '=': {
        if (caseSum() === 0) {
          rebuild = '';
          line = line.substr(pointer + 1);
        } else if (rebuild.length > 0) {
          matches.push(rebuild);
          rebuild = '';
        }
        cases.ENDLINES++;

        pointer++;
        break;
      }
      case '.': {
        cases.DOTS++;

        if (rebuild.length > 0) {
          matches.push(rebuild);
          rebuild = '';
        }

        pointer++;
        break;
      }
      case ',': {
        cases.COMMAS++;

        if (rebuild.length > 0) {
          matches.push(rebuild);
          rebuild = '';
        }

        pointer++;
        break;
      }
      case ' ': {
        cases.SPACES++;

        pointer++;
        break;
      }
      case ';': {
        if (cases.ENDLINES > 0) {
          cases.ENDLINES++;

          if (rebuild.length > 0) {
            matches.push(rebuild);
            rebuild = '';
          }
        }

        pointer++;
        break;
      }
      default: {
        rebuild += char;

        pointer++;
        break;
      }
    }
  }
  if (rebuild.length > 0) {
    matches.push(rebuild);
  }

  return matches as ['request' | 'req', BlockMode, string?];
};
