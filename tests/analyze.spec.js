// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-unused-vars */
import analyze, {
  babelCompilerManipulationNormalize,
  functionToString,
  stringSplit
} from '../esm/analyze';

describe('utils', () => {
  it('utils/fn-to-string', () => {
    expect(
      stringSplit(
        babelCompilerManipulationNormalize(
          functionToString((req) => {
            // @comment
            const foo = req.method;
            const { method } = req;
            const { method: bar } = req;
            const zoo = req.getMethod();
            const all_request = req;
          })
        )
      )
    ).toEqual([
      'req => {',
      '// @comment',
      'const foo = req.method;',
      'const {method} = req;',
      'const {method: bar} = req;',
      'const zoo = req.getMethod();',
      'const all_request = req;}'
    ]);
  });
});

describe('property parse', () => {
  it('req.method', () => {
    expect(
      analyze((req) => {
        const foo = req.method;
        const { method } = req;
        const { method: bar } = req;
        const zoo = req.getMethod();
        const all_request = req;
      })
    ).toEqual([
      {
        key: 'method',
        line_index: 1,
        link: 'foo',
        linked: false,
        mode: 'property'
      },
      {
        key: 'method',
        line_index: 2,
        link: 'method',
        linked: false,
        mode: 'property'
      },
      {
        key: 'method',
        line_index: 3,
        link: 'bar',
        linked: false,
        mode: 'property'
      },
      {
        key: '*',
        line_index: 5,
        link: 'all_request',
        linked: false,
        mode: 'property'
      }
    ]);
  });
  it('req.url', () => {
    expect(
      analyze((req) => {
        // @url
        const url1 = req.url;
        const { url } = req;
        const { url: url2 } = req;
        const url3 = req.getUrl();
        const all_request2 = req;
      })
    ).toEqual([
      {
        key: 'url',
        line_index: 2,
        link: 'url1',
        linked: false,
        mode: 'property'
      },
      {
        key: 'url',
        line_index: 3,
        link: 'url',
        linked: false,
        mode: 'property'
      },
      {
        key: 'url',
        line_index: 4,
        link: 'url2',
        linked: false,
        mode: 'property'
      },
      {
        key: '*',
        line_index: 6,
        link: 'all_request2',
        linked: false,
        mode: 'property'
      }
    ]);
  });
});

describe('request property parse', () => {
  it('req.headers', () => {
    expect(
      analyze((req) => {
        const { foo } = req.headers;
        const { bar } = req.headers;
        const { baz: quux } = req.headers;
        const zoo = req.header('zoo');
        const lorem = req.getHeader('zoo');
        const all_headers = req.headers;
      })
    ).toEqual([
      {
        key: 'foo',
        line_index: 1,
        link: 'foo',
        linked: false,
        mode: 'headers'
      },
      {
        key: 'bar',
        line_index: 2,
        link: 'bar',
        linked: false,
        mode: 'headers'
      },
      {
        key: 'baz',
        line_index: 3,
        link: 'quux',
        linked: false,
        mode: 'headers'
      },
      {
        key: 'zoo',
        line_index: 4,
        link: 'zoo',
        linked: false,
        mode: 'headers'
      },
      {
        key: '*',
        line_index: 6,
        link: 'all_headers',
        linked: false,
        mode: 'headers'
      }
    ]);
  });
  it('req.cookies', () => {
    expect(
      analyze((req) => {
        const { foo } = req.cookies;
        const { bar } = req.cookies;
        const { baz: quux } = req.cookies;
        const zoo = req.cookie('zoo');
        const all_cookies = req.cookies;
      })
    ).toEqual([
      {
        key: 'foo',
        line_index: 1,
        link: 'foo',
        linked: false,
        mode: 'cookies'
      },
      {
        key: 'bar',
        line_index: 2,
        link: 'bar',
        linked: false,
        mode: 'cookies'
      },
      {
        key: 'baz',
        line_index: 3,
        link: 'quux',
        linked: false,
        mode: 'cookies'
      },
      {
        key: 'zoo',
        line_index: 4,
        link: 'zoo',
        linked: false,
        mode: 'cookies'
      },
      {
        key: '*',
        line_index: 5,
        link: 'all_cookies',
        linked: false,
        mode: 'cookies'
      }
    ]);
  });
  it('req.params', () => {
    expect(
      analyze((req) => {
        const { foo } = req.params;
        const { bar } = req.params;
        const { baz: quux } = req.params;
        const zoo = req.param('zoo');
        const lorem = req.getParameter(0);
        const all_params = req.params;
      })
    ).toEqual([
      {
        key: 'foo',
        line_index: 1,
        link: 'foo',
        linked: false,
        mode: 'params'
      },
      {
        key: 'bar',
        line_index: 2,
        link: 'bar',
        linked: false,
        mode: 'params'
      },
      {
        key: 'baz',
        line_index: 3,
        link: 'quux',
        linked: false,
        mode: 'params'
      },
      {
        key: 'zoo',
        line_index: 4,
        link: 'zoo',
        linked: false,
        mode: 'params'
      },
      {
        key: '*',
        line_index: 6,
        link: 'all_params',
        linked: false,
        mode: 'params'
      }
    ]);
    expect(
      analyze((request, response) => {
        response.end(request.params.id);
      })
    ).toEqual([
      {
        key: 'id',
        line_index: 1,
        link: 'id',
        linked: false,
        mode: 'params'
      }
    ]);
  });
  it('req.query', () => {
    expect(
      analyze((req) => {
        const { foo } = req.query;
        const { bar } = req.query;
        const { baz: quux } = req.query;
        const zoo = req.getQuery('zoo');
        const all_query = req.query;
      })
    ).toEqual([
      {
        key: 'foo',
        line_index: 1,
        link: 'foo',
        linked: false,
        mode: 'query'
      },
      {
        key: 'bar',
        line_index: 2,
        link: 'bar',
        linked: false,
        mode: 'query'
      },
      {
        key: 'baz',
        line_index: 3,
        link: 'quux',
        linked: false,
        mode: 'query'
      },
      {
        key: 'zoo',
        line_index: 4,
        link: 'zoo',
        linked: false,
        mode: 'query'
      },
      {
        key: '*',
        line_index: 5,
        link: 'all_query',
        linked: false,
        mode: 'query'
      }
    ]);
  });
  it('req.body', () => {
    expect(
      analyze((req) => {
        const { foo } = req.body;
        const { bar } = req.body;
        const { baz: quux } = req.body;
        const zoo = req.getBodyField('zoo');
        const all_body = req.body;
      })
    ).toEqual([
      {
        key: 'foo',
        line_index: 1,
        link: 'foo',
        linked: false,
        mode: 'body'
      },
      {
        key: 'bar',
        line_index: 2,
        link: 'bar',
        linked: false,
        mode: 'body'
      },
      {
        key: 'baz',
        line_index: 3,
        link: 'quux',
        linked: false,
        mode: 'body'
      },
      {
        key: 'zoo',
        line_index: 4,
        link: 'zoo',
        linked: false,
        mode: 'body'
      },
      {
        key: '*',
        line_index: 5,
        link: 'all_body',
        linked: false,
        mode: 'body'
      }
    ]);
  });
});
