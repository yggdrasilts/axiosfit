export class TestRoutes {
  static BASE = '/axiosfit';

  static GET = {
    ERROR: {
      URL: '/error',
    },
    REQUEST: {
      URL: '/performGet',
    },
    WITH_REQUEST_INTERCEPTOR: {
      URL: '/with_req_interceptor',
    },
    WITH_RESPONSE_INTERCEPTOR: {
      URL: '/with_res_interceptor',
    },
    WITH_PARAM: {
      URL: '/performGet/:id',
      PARAMS: {
        ID: 'id',
      },
    },
    WITH_PARAMS: {
      URL: '/performGet/:id/:id2',
      PARAMS: {
        ID: 'id',
        ID2: 'id2',
      },
    },
  };

  static DELETE = {
    ERROR: {
      URL: '/error',
    },
    REQUEST: {
      URL: '/performDelete',
    },
  };

  static HEAD = {
    ERROR: {
      URL: '/error',
    },
    REQUEST: {
      URL: '/performHead',
    },
  };

  static POST = {
    ERROR: {
      URL: '/error',
    },
    REQUEST: {
      URL: '/performPost',
    },
  };

  static PUT = {
    ERROR: {
      URL: '/error',
    },
    REQUEST: {
      URL: '/performPut',
    },
  };

  static PATCH = {
    ERROR: {
      URL: '/error',
    },
    REQUEST: {
      URL: '/performPatch',
    },
  };
}
