import variableKeyExtractor from '../../extractors/variable-key';
import { IBlock } from '../../types/interfaces';

export default function requestModeParamsFinder(
  _: string,
  _key: string,
  line: string,
  index: number
): IBlock | null | void {
  let key;
  let link;
  const extracted = variableKeyExtractor(line);

  if (!extracted) {
    return undefined;
  }

  if (_key.toLowerCase().includes('param')) {
    if (_key.includes('params.')) {
      key = _key.substr(7);

      return {
        link: extracted[1],
        linked: false,
        line_index: index,
        key
      };
    }
    if (_key.includes('param(')) {
      key = _key.substr(7);
      key = key.substr(0, key.length - 2);

      return {
        link: extracted[1],
        linked: false,
        line_index: index,
        key
      };
    }
    if (_key.includes('getParameter(')) {
      // uWebSockets.js has native `getParameter` support
      return null;
    }
    if (_key === 'params' && extracted[1].charAt(0) === '{') {
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
    if (_key === 'params') {
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
