const express = require('express');
const router = express.Router();

const buildUrl = require('./../utils/utils').buildUrl;

const testRoutes = require('./../services/TestRoutes').TestRoutes;

const testData = require('./../data/testData.json');

router.put(buildUrl(testRoutes.BASE, testRoutes.PUT.REQUEST.URL), function (req, res) {
  res.json(testData.PUT.performPutRequest.check);
});

module.exports = router;
