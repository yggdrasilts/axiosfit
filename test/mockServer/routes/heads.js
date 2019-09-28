const express = require('express');
const router = express.Router();

const buildUrl = require('./../utils/utils').buildUrl;

const testRoutes = require('./../services/TestRoutes').TestRoutes;

const testData = require('./../data/testData.json');

router.head(buildUrl(testRoutes.BASE, testRoutes.HEAD.REQUEST.URL), function (req, res) {
  res.send(testData.HEAD.performHeadRequest.check);
});

module.exports = router;
