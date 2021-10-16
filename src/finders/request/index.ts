import { IBlock } from '../../types/interfaces';
import requestModeBodyFinder from './body';
import requestModeCookiesFinder from './cookies';
import requestModeHeadersFinder from './headers';
import requestModeParamsFinder from './params';
import requestMethodFinder from './property';
import requestModeQueryFinder from './query';

export default function caseRequestModeFinder(
  line: string,
  index: number
): IBlock | null | undefined {
  const requestPropertyCaseFindMatch = line.match(/req.(.*)?(;|\.|\()/);
  let res = null;
  let _;
  let _key;

  if (requestPropertyCaseFindMatch) {
    [_, _key] = requestPropertyCaseFindMatch;

    // Headers matching
    res = requestModeHeadersFinder(_, _key, line, index);
    if (res !== undefined) {
      if (res !== null) {
        res.mode = 'headers';
      }
      return res;
    }

    // Cookies matching
    res = requestModeCookiesFinder(_, _key, line, index);
    if (res !== undefined) {
      if (res !== null) {
        res.mode = 'cookies';
      }
      return res;
    }

    // Params matching
    res = requestModeParamsFinder(_, _key, line, index);
    if (res !== undefined) {
      if (res !== null) {
        res.mode = 'params';
      }
      return res;
    }

    // Params matching
    res = requestModeQueryFinder(_, _key, line, index);
    if (res !== undefined) {
      if (res !== null) {
        res.mode = 'query';
      }
      return res;
    }

    // Body matching
    res = requestModeBodyFinder(_, _key, line, index);
    if (res !== undefined) {
      if (res !== null) {
        res.mode = 'body';
      }
      return res;
    }

    // Method matching
    res = requestMethodFinder(_, _key, line, index);
    if (res !== undefined) {
      if (res !== null) {
        res.mode = 'property';
      }
      return res;
    }
  } else {
    // Method matching
    res = requestMethodFinder(
      _ as unknown as string,
      line.substr(line.indexOf('req')),
      line,
      index
    );
    if (res) {
      res.mode = 'property';
      return res;
    }
  }
  return undefined;
}
