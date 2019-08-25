"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MethodsRoutes {
}
MethodsRoutes.BASE = '/test';
MethodsRoutes.GET = {
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
exports.MethodsRoutes = MethodsRoutes;
