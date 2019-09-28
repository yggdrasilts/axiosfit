const express = require('express');
const router = express.Router();

const buildUrl = require('./../utils/utils').buildUrl;

const testRoutes = require('./../services/TestRoutes').TestRoutes;

const testData = require('./../data/testData.json');

router.delete(buildUrl(testRoutes.BASE, testRoutes.DELETE.REQUEST.URL), function (req, res) {
  res.send(testData.DELETE.performDeleteRequest.check);
});

module.exports = router;
