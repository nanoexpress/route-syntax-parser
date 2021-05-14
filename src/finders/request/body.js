import variableKeyExtractor from '../../extractors/variable-key.js';

export default function requestModeBodyFinder(_, _key, line, index) {
  let key;
  let link;
  const extracted = variableKeyExtractor(line);

  if (!extracted) {
    return undefined;
  }

  if (_key.toLowerCase().includes('body')) {
    if (_key.includes('body.')) {
      key = _key.substr(5);

      return {
        link: extracted[1],
        linked: false,
        line_index: index,
        key
      };
    }
    if (_key.includes('getBodyField(')) {
      key = _key.substr(14);
      key = key.substr(0, key.length - 2);

      return {
        link: extracted[1],
        linked: false,
        line_index: index,
        key
      };
    }
    if (_key === 'body' && extracted[1].charAt(0) === '{') {
      key = extracted[1].substr(1);
      key = key.substr(0, key.length - 1).trim();
      link = key;

      if (line.indexOf(':') !== -1) {
        [key, link] = key.split(/: |:/);
      }

      return {
        link,
        linked: false,
        line_index: index,
        key
      };
    }
    if (_key === 'body') {
      return {
        link: extracted[1],
        linked: false,
        line_index: index,
        key: '*'
      };
    }
  }

  return undefined;
}
