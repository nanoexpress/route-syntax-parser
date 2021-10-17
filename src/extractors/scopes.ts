import { BlockMode } from '../../types/interfaces';

export default (line: string): ['request' | 'req', BlockMode, string?] => {
  const matches = [];
  const cases = {
    SCOPE: 0,
    CURVE_SCOPE: 0,
    QUOTE: 0,
    TRAILING: 0,
    ENDLINES: 0,
    DOTS: 0,
    COMMAS: 0
  };

  let rebuild = '';
  for (const char of line) {
    switch (char) {
      case '(': {
        cases.SCOPE++;

        rebuild += char;
        break;
      }
      case "'":
      case '"': {
        cases.QUOTE++;

        rebuild += char;
        break;
      }
      case '{': {
        cases.CURVE_SCOPE++;

        rebuild += char;
        break;
      }
      case ')': {
        if (cases.SCOPE > 0) {
          cases.SCOPE++;
          rebuild += char;
        } else {
          // rebuild = '';
        }
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
        break;
      }
      case ':':
      case '=': {
        cases.ENDLINES++;

        if (rebuild.length > 0) {
          matches.push(rebuild);
          rebuild = '';
        }
        break;
      }
      case '.': {
        cases.DOTS++;

        if (rebuild.length > 0) {
          matches.push(rebuild);
          rebuild = '';
        }
        break;
      }
      case ',': {
        cases.COMMAS++;

        if (rebuild.length > 0) {
          matches.push(rebuild);
          rebuild = '';
        }
        break;
      }
      case ' ': {
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
        break;
      }
      default: {
        rebuild += char;

        break;
      }
    }
  }
  if (rebuild.length > 0) {
    matches.push(rebuild);
  }

  return matches as ['request' | 'req', BlockMode, string?];
};
