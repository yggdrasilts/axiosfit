const express = require('express');
const router = express.Router();

const buildUrl = require('./../utils/utils').buildUrl;

const testRoutes = require('./../services/TestRoutes').TestRoutes;

const testData = require('./../data/testData.json');

router.get(testRoutes.GET.REQUEST.URL, function (req, res) {
  res.send(testData.GET.performGetRequest.check);
});

router.get(testRoutes.GET.ERROR.URL, function (req, res) {
  res.status(500).send('Something broke!');
});

router.get(buildUrl(testRoutes.BASE, testRoutes.GET.REQUEST.URL), function (req, res) {
  if (Object.keys(req.query).length !== 0) {
    res.send(JSON.stringify(req.query));
  } else {
    res.send(testData.GET.performGetRequest.check);
  }
});

router.get(buildUrl(testRoutes.BASE, testRoutes.GET.WITH_REQUEST_INTERCEPTOR.URL), function (req, res) {
  res.json({
    headers: req.headers
  });
});

router.get(buildUrl(testRoutes.BASE, testRoutes.GET.WITH_RESPONSE_INTERCEPTOR.URL), function (req, res) {
  res.json(testData.GET.performGetRequestAddingResInterceptor.check);
});

router.get(buildUrl(testRoutes.BASE, testRoutes.GET.WITH_PARAM.URL), function (req, res) {
  res.send(testData.GET.performGetRequestUsingAPathVariable.check);
});

router.get(buildUrl(testRoutes.BASE, testRoutes.GET.WITH_PARAMS.URL), function (req, res) {
  res.send(testData.GET.performGetRequestUsingPathVariables.check);
});

module.exports = router;
