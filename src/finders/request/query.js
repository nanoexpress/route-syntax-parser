import variableKeyExtractor from '../../extractors/variable-key.js';

export default function requestModeQueryFinder(_, _key, line, index) {
  let key;
  let link;
  const extracted = variableKeyExtractor(line);

  if (!extracted) {
    return undefined;
  }

  if (_key.toLowerCase().includes('query')) {
    if (_key.includes('query.')) {
      key = _key.substr(6);

      return {
        link: extracted[1],
        linked: false,
        line_index: index,
        key
      };
    }
    if (_key.includes('getQuery(')) {
      key = _key.substr(10);
      key = key.substr(0, key.length - 2);

      return {
        link: extracted[1],
        linked: false,
        line_index: index,
        key
      };
    }
    if (_key === 'query' && extracted[1].charAt(0) === '{') {
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
    if (_key === 'query') {
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
