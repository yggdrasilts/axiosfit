export class MethodsRoutes {
  static BASE = '/test';

  static GET = {
    DEMO: {
      URL: '/demo',
    },
    DEMO_WITH_REQUEST_INTERCEPTOR: {
      URL: '/demo_with_req_interceptor',
    },
    DEMO_WITH_RESPONSE_INTERCEPTOR: {
      URL: '/demo_with_res_interceptor',
    },
    WITH_PARAM: {
      URL: '/demo/:id',
      PARAMS: {
        ID: 'id',
      },
    },
    WITH_PARAMS: {
      URL: '/demo/:id/:id2',
      PARAMS: {
        ID: 'id',
        ID2: 'id2',
      },
    },
  };

  static DELETE = {
    DEMO: {
      URL: '/demo',
    },
  };

  static HEAD = {
    DEMO: {
      URL: '/demo',
    },
  };

  static POST = {
    DEMO: {
      URL: '/demo',
    },
  };

  static PUT = {
    DEMO: {
      URL: '/demo',
    },
  };

  static PATCH = {
    DEMO: {
      URL: '/demo',
    },
  };
}
