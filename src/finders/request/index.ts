import scopeExtractor from '../../extractors/scopes';
import { IBlock } from '../../types/interfaces';
import isScopeIn from '../../utils/is-scope-in';
import requestModeBodyFinder from './body';
import requestModeCookiesFinder from './cookies';
import requestModeHeadersFinder from './headers';
import requestModeParamsFinder from './params';
import requestMethodFinder from './property';
import requestModeQueryFinder from './query';

export default function caseRequestModeFinder(
  raw_line: string,
  index: number
): IBlock | null | undefined {
  const line = raw_line.trim();
  const requestPropertyCaseFindMatch = line.match(
    /(request|req).(.*)?(;|\.|\()/
  );

  let res = null;
  let input;
  let _;
  let _key;
  let _skey;

  if (requestPropertyCaseFindMatch) {
    [input] = requestPropertyCaseFindMatch;
    [_, _key, _skey] = scopeExtractor(input);

    if (_skey) {
      if (isScopeIn(_key)) {
        return {
          link: _skey,
          linked: false,
          line_index: index,
          key: _skey,
          mode: _key
        } as IBlock;
      }
      return undefined;
    }

    if (_key === undefined) {
      [_, _key] = scopeExtractor(line);

      return {
        link: _key,
        linked: false,
        line_index: index,
        key: _key,
        mode: 'property'
      } as IBlock;
    }

    // Headers matching
    res = requestModeHeadersFinder(_, _key, line, index);
    if (res !== undefined) {
      return res;
    }

    // Cookies matching
    res = requestModeCookiesFinder(_, _key, line, index);
    if (res !== undefined) {
      return res;
    }

    // Params matching
    res = requestModeParamsFinder(_, _key, line, index);

    if (res !== undefined) {
      return res;
    }

    // Params matching
    res = requestModeQueryFinder(_, _key, line, index);
    if (res !== undefined) {
      return res;
    }

    // Body matching
    res = requestModeBodyFinder(_, _key, line, index);
    if (res !== undefined) {
      return res;
    }

    // Method matching
    res = requestMethodFinder(_, _key, line, index);
    if (res !== undefined) {
      return res;
    }

    if (_key && res !== null) {
      return {
        link: _key,
        linked: false,
        line_index: index,
        key: _key,
        mode: 'property'
      } as IBlock;
    }
  } else {
    // Method matching
    const reqIndex = line.indexOf('req');
    const requestIndex = line.indexOf('request');
    res = requestMethodFinder(
      _ as unknown as string,
      line.substr(requestIndex !== -1 ? requestIndex : reqIndex),
      line,
      index
    );
    if (res) {
      return res;
    }
  }
  return undefined;
}
