export class MethodsRoutes {
  static BASE = '/axiosfit';

  static GET = {
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
    REQUEST: {
      URL: '/performDelete',
    },
  };

  static HEAD = {
    REQUEST: {
      URL: '/performHead',
    },
  };

  static POST = {
    REQUEST: {
      URL: '/performPost',
    },
  };

  static PUT = {
    REQUEST: {
      URL: '/performPut',
    },
  };

  static PATCH = {
    REQUEST: {
      URL: '/performPatch',
    },
  };
}
