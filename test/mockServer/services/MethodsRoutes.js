"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MethodsRoutes {
}
MethodsRoutes.BASE = '/test';
MethodsRoutes.GET = {
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
MethodsRoutes.POST = {
    DEMO: {
        URL: '/demo',
    },
};
exports.MethodsRoutes = MethodsRoutes;
