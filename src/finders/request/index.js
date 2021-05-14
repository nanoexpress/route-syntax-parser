import requestModeBodyFinder from './body.js';
import requestModeCookiesFinder from './cookies.js';
import requestModeHeadersFinder from './headers.js';
import requestModeParamsFinder from './params.js';
import requestMethodFinder from './property.js';
import requestModeQueryFinder from './query.js';

export default function caseRequestModeFinder(line, index) {
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
    res = requestMethodFinder(_, line.substr(line.indexOf('req')), line, index);
    if (res) {
      res.mode = 'property';
      return res;
    }
  }

  return null;
}
