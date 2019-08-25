export class MethodsRoutes {
  static BASE = '/test';

  static GET = {
    DEMO: {
      URL: '/demo',
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
}
