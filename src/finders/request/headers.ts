import { IBlock } from '../../../types/interfaces';
import variableKeyExtractor from '../../extractors/variable-key';

export default function requestModeHeadersFinder(
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

  if (_key.toLowerCase().includes('header')) {
    if (_key.includes('headers.')) {
      key = _key.substr(8);

      return {
        link: extracted[1],
        linked: false,
        line_index: index,
        key,
        mode: 'headers'
      };
    }
    if (_key.includes('header(')) {
      key = _key.substr(8);
      key = key.substr(0, key.length - 2);

      return {
        link: extracted[1],
        linked: false,
        line_index: index,
        key,
        mode: 'headers'
      };
    }
    if (_key.includes('getHeader(')) {
      // uWebSockets.js has native `getHeader` support
      return null;
    }
    if (_key === 'headers' && extracted[1].charAt(0) === '{') {
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
        key,
        mode: 'headers'
      };
    }
    if (_key === 'headers') {
      return {
        link: extracted[1],
        linked: false,
        line_index: index,
        key: '*',
        mode: 'headers'
      };
    }
  }

  return undefined;
}
