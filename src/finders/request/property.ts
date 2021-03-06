import { IBlock } from '../../../types/interfaces';
import variableKeyExtractor from '../../extractors/variable-key';

export default function requestMethodFinder(
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

  if (
    (extracted[2].includes('req.') || extracted[2].includes('request.')) &&
    !extracted[2].includes('()')
  ) {
    return {
      link: extracted[1],
      linked: false,
      line_index: index,
      key: _key,
      mode: 'property'
    };
  }
  if (_key.includes('getMethod(') || _key.includes('getUrl(')) {
    // uWebSockets.js has native `getMethod` and `getUrl` support
    return null;
  }
  if (
    (_key === 'req;' || _key === 'request;') &&
    extracted[1].charAt(0) === '{'
  ) {
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
      mode: 'property'
    };
  }
  if (_key.endsWith('req') || _key.endsWith('request')) {
    return {
      link: extracted[1],
      linked: false,
      line_index: index,
      key: '*',
      mode: 'property'
    };
  }

  return undefined;
}
